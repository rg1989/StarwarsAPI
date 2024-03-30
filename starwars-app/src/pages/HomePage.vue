<template>
  <div>
    <h1 class="display-1">HomePage:</h1>
    <Autocomplete
      :filteredData="searchResults"
      :isLoading="isLoading"
      @inputChange="inputChange"
      @itemSelect="itemSelect"
      @categorySelect="categorySelect"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
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

    const store = useStore();

    onMounted(async () => {
      await store.dispatch("fetchCategories");
    });

    const inputChange = async (inputValue) => {
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
      router.push({ name: routeNames.ENTITY, params: { name: item.name } });
    };

    const categorySelect = (category) => {
      router.push({ name: category });
    };

    return {
      isLoading,
      searchResults,
      inputChange: debouncedInputChange,
      itemSelect,
      categorySelect,
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
