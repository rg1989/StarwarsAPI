<template>
  <div class="autocomplete">
    <v-text-field
      class="input"
      type="text"
      v-model="searchInput"
      prepend-inner-icon="mdi-magnify"
      single-line
      placeholder="Search the stars"
      @input="handleInput"
    />
    <ul v-if="Object.keys(filteredData).length > 0" class="dropdown">
      <li v-for="(items, category) in filteredData" :key="category">
        <span class="category">{{ category }}</span>
        <ul>
          <li
            class="result_item"
            v-for="item in items.slice(0, 3)"
            :key="item"
            @click="selectItem(item)"
          >
            {{ item.name }}
            <!-- <span v-html="highlightMatch(item.name)"></span> -->
          </li>
          <li class="result_item" v-if="items.length > 3">Show all...</li>
        </ul>
      </li>
    </ul>
    <ul class="loader" v-else>
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Autocomplete",
  props: {
    filteredData: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const searchInput = ref("");

    const handleInput = () => {
      emit("input");
    };

    const selectItem = (item) => {
      emit("select", item);
      searchInput.value = ""; // Clear input after selection if needed
    };

    // const highlightMatch = (name) => {
    //   if (!searchInput.value) return name;
    //   const regex = new RegExp(searchInput.value, "gi");
    //   return name.replace(regex, (match) => `<span class="highlight">${match}</span>`);
    // };

    return {
      searchInput,
      handleInput,
      selectItem,
      // highlightMatch,
    };
  },
};
</script>

<style scoped>
.autocomplete {
  width: 30%;
  margin: auto;
}
.input {
  width: 100%;
}

.dropdown {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 0.5rem;
}

.category {
  font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
}

.result_item:hover {
  background-color: #f0f0f0;
}

.highlight {
  background-color: yellow; /* Adjust highlight color as needed */
}
.loader {
  text-align: center;
}
</style>
