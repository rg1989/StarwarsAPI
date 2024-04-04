<template>
  <EditableServerTable
    :headers="headers"
    :loadItems="loadPeople"
    :addItem="addCharacter"
    :deleteItem="deleteCharacter"
    :editItem="editCharacter"
  />
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import EditableServerTable from "../components/EditableServerTable.vue";

export default {
  name: "PeoplePage",
  components: {
    EditableServerTable,
  },
  setup() {
    const headers = reactive([
      { key: "name", align: "start", title: "Name", value: "name" },
      { key: "gender", title: "Gender", value: "gender" },
      { key: "birth_year", title: "Birth Year", value: "birth_year" },
      { key: "height", title: "Height", value: "height" },
      { key: "mass", title: "Mass", value: "mass" },
    ]);

    const store = useStore();

    const loadPeople = async (page) => {
      try {
        const peopleList = await store.dispatch("fetchPeopleByPage", page);
        return peopleList;
      } catch (error) {
        console.error("Error fetching people:", error);
        return [];
      }
    };

    // ADD CHARACTER
    const addCharacter = (newCharacter) => {
      store.dispatch("addCharacter", newCharacter);
    };

    //DELETE CHARACTER
    const deleteCharacter = (character) => {
      store.dispatch("deleteCharacter", character);
    };

    //EDIT CHARACTER
    const editCharacter = (editedCharacter) => {
      store.dispatch("editCharacter", editedCharacter);
    };

    return {
      headers,
      loadPeople,
      addCharacter,
      deleteCharacter,
      editCharacter,
    };
  },
};
</script>
