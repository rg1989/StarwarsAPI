<template>
  <div>
    <h1 class="display-1">HomePage:</h1>
    <Autocomplete
      ref="autocompleteRef"
      :isFocused="isAutocompleteFocused"
      :filteredData="searchResults"
      :isLoading="isLoading"
      @inputChange="inputChange"
      @itemSelect="itemSelect"
      @categorySelect="categorySelect"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import Autocomplete from "../components/CustomAutocomplete.vue";
import { debounce } from "lodash";
import { useStore } from "vuex";
import router from "../router/index.js";
import { routeNames } from "../config/config.js";

export default {
  name: "HomePage",
  components: {
    Autocomplete,
  },
  setup() {
    const isLoading = ref(false);
    const searchResults = reactive({});
    const autocompleteRef = ref(null);
    const isAutocompleteFocused = ref(false);

    const store = useStore();

    onMounted(async () => {
      await store.dispatch("fetchCategories");
    });

    const inputChange = async (inputValue) => {
      if (inputValue == "") {
        for (const key in searchResults) {
          delete searchResults[key];
        }
        isLoading.value = false;
        return;
      }
      isLoading.value = true;
      const newResults = await store.dispatch("fetchDataByString", inputValue);
      newResults.forEach(({ category, data }) => {
        if (!data.results.length) {
          delete searchResults[category];
        } else {
          searchResults[category] = data.results;
        }
      });
      isLoading.value = false;
    };

    const debouncedInputChange = debounce(inputChange, 200);

    const itemSelect = (item) => {
      store.dispatch("selectEntity", item);
      router.push({
        name: routeNames.ENTITY,
        params: { entity: JSON.stringify({ ...item }) },
      });
    };

    const categorySelect = (category) => {
      router.push({ name: category });
    };

    const handleClickOutside = (event) => {
      if (autocompleteRef.value && !autocompleteRef.value.$el.contains(event.target)) {
        isAutocompleteFocused.value = false;
      } else {
        isAutocompleteFocused.value = true;
      }
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    return {
      isLoading,
      searchResults,
      inputChange: debouncedInputChange,
      itemSelect,
      categorySelect,
      autocompleteRef,
      isAutocompleteFocused,
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
