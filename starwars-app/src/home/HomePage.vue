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
import { ref, reactive, watch } from "vue";
import Autocomplete from "../components/CustomAutocomplete.vue";
import { debounce } from "lodash";

export default {
  name: "HomePage",
  components: {
    Autocomplete,
  },
  setup() {
    const categories = ref([]);
    const isLoading = ref(false);
    const searchResults = reactive({});

    const prefetchCategories = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/`);
        categories.value = Object.keys(await response.json());
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    prefetchCategories();

    async function fetchData(category, inputValue) {
      try {
        const response = await fetch(
          `https://swapi.dev/api/${category}?search=${inputValue}`
        );
        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    }

    const handleInput = async (inputValue) => {
      const requests = categories.value.map(async (category) => {
        const results = await fetchData(category, inputValue);
        if (!results.length) {
          delete searchResults[category];
        } else {
          searchResults[category] = results;
        }
      });
      await Promise.all(requests);
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
