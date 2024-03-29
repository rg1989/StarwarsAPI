<template>
  <div>
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <h1>Home Page:</h1>
      <Autocomplete
        :filteredData="searchResults"
        @searchChange="handleInput"
        @itemSelect="handleSelect"
      />
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import Autocomplete from "../components/CustomAutocomplete.vue";
import { debounce } from "lodash";
import { useStore } from "vuex";

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

    const handleInput = async (inputValue) => {
      const newResults = await store.dispatch("fetchDataByString", inputValue);
      newResults.forEach(({ category, data }) => {
        if (!data.results.length) {
          delete searchResults[category];
        } else {
          searchResults[category] = data.results;
        }
      });
    };

    const debouncedHandleInput = debounce(handleInput, 200);

    const handleSelect = (item) => {
      console.log("Selected item:", item);
      // Handle the selected item here
    };

    return {
      isLoading,
      searchResults,
      handleInput: debouncedHandleInput,
      handleSelect,
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
