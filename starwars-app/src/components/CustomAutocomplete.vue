<template>
  <div class="autocomplete">
    <v-text-field
      class="input"
      type="text"
      v-model="searchInput"
      prepend-inner-icon="mdi-magnify"
      single-line
      placeholder="Search the stars"
      @input="handleChange"
      hide-details
    />
    <ul v-if="!isLoading" class="dropdown" :class="{ dropdownHidden: isDropdownEmpty }">
      <li v-for="(items, category) in filteredData" :key="category">
        <span class="category">{{ category }}</span>
        <ul>
          <li
            class="result_item pointer"
            v-for="item in items.slice(0, 3)"
            :key="item"
            @click="itemSelect(item)"
          >
            <span v-html="highlightedName(item.name)"></span>
          </li>
          <li
            class="result_item show_more_item pointer"
            @click="categorySelect(category)"
          >
            Show all...
          </li>
        </ul>
      </li>
    </ul>
    <ul class="loader" v-if="isLoading">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "Autocomplete",
  props: {
    filteredData: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    isFocused: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  setup(props, { emit }) {
    const searchInput = ref("");
    const isDropdownEmpty = computed(
      () => Object.keys(props.filteredData).length == 0 || !props.isFocused
    );

    const handleChange = () => {
      emit("inputChange", searchInput.value);
    };

    const itemSelect = (item) => {
      emit("itemSelect", item);
    };

    const categorySelect = (category) => {
      emit("categorySelect", category);
    };
    const highlightedName = (name) => {
      if (!name) return name;
      const searchTerm = searchInput.value.toLowerCase();
      const index = name.toLowerCase().indexOf(searchTerm);
      if (index === -1) return name;
      const highlighted =
        name.slice(0, index) +
        "<mark>" +
        name.slice(index, index + searchTerm.length) +
        "</mark>" +
        name.slice(index + searchTerm.length);
      return highlighted;
    };

    return {
      searchInput,
      handleChange,
      itemSelect,
      categorySelect,
      isDropdownEmpty,
      highlightedName,
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
  background-color: #e4f5fc;
  border: 1px solid #ccc;
  padding: 0.5rem;
}
.dropdownHidden {
  display: none;
}

.category {
  font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
}

.pointer {
  cursor: pointer;
}

.result_item:hover {
  background-color: #a9d4df;
}
.show_more_item {
  text-align: right;
  font-weight: bold;
}
.show_more_item:hover {
  background-color: #a9d4df;
}
.loader {
  text-align: center;
}
mark {
  background-color: yellow;
}
</style>
