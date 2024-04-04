<template>
  <EditableServerTable></EditableServerTable>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import PersonAddDialog from "../components/PersonAddDialog.vue";
import PersonEditDialog from "../components/PersonEditDialog.vue";
import EditableServerTable from "../components/EditableServerTable.vue";

export default {
  name: "PeoplePage2",
  components: {
    PersonAddDialog,
    PersonEditDialog,
    EditableServerTable,
  },
  // setup() {
  //   const itemsPerPage = ref(10);
  //   const headers = reactive([
  //     { key: "name", align: "start", title: "Name", value: "name" },
  //     { key: "gender", title: "Gender", value: "gender" },
  //     { key: "birth_year", title: "Birth Year", value: "birth_year" },
  //     { key: "height", title: "Height", value: "height" },
  //     { key: "mass", title: "Mass", value: "mass" },
  //   ]);
  //   const serverItems = ref([]);
  //   const loading = ref(true);
  //   const totalItems = ref(0);

  //   const editableCharacter = ref({});
  //   const isAddDialog = ref(false);
  //   const isEditDialog = ref(false);
  //   const editableCharacterIndex = ref(0);

  //   const store = useStore();

  //   const loadItems = async ({ page, itemsPerPage }) => {
  //     try {
  //       loading.value = true;
  //       const response = await store.dispatch("fetchPeopleByPage", page);
  //       serverItems.value = response.results;
  //       totalItems.value = response.count;
  //       loading.value = false;
  //     } catch (error) {
  //       console.error("Error fetching people:", error);
  //     }
  //   };

  //   // ADD CHARACTER
  //   const closeAddDialog = () => {
  //     isAddDialog.value = false;
  //   };

  //   const openAddDialog = () => {
  //     isAddDialog.value = true;
  //   };

  //   const addNewCharacter = (newCharacter) => {
  //     store.dispatch("addCharacter", newCharacter);
  //   };

  //   //DELETE CHARACTER
  //   const deleteCharacter = (character) => {
  //     console.log("delete" + character.name);
  //     store.dispatch("deleteCharacter", character);
  //   };

  //   //EDIT CHARACTER
  //   const closeEditDialog = () => {
  //     isEditDialog.value = false;
  //   };

  //   const openEditDialog = (charecter, index) => {
  //     editableCharacter.value = charecter;
  //     editableCharacterIndex.value = index;
  //     isEditDialog.value = true;
  //   };

  //   const editCharacter = (editedCharacter) => {
  //     store.dispatch("editCharacter", {
  //       value: editedCharacter,
  //       index: editableCharacterIndex.value,
  //     });
  //   };

  //   return {
  //     itemsPerPage,
  //     headers,
  //     serverItems,
  //     loading,
  //     totalItems,
  //     loadItems,
  //     closeAddDialog,
  //     openAddDialog,
  //     addNewCharacter,
  //     isAddDialog,
  //     deleteCharacter,
  //     closeEditDialog,
  //     openEditDialog,
  //     editCharacter,
  //     isEditDialog,
  //     editableCharacter,
  //     editableCharacterIndex,
  //   };
  // },
};
</script>

<!-- <style>
.table-container {
  position: relative;
}

.buttons-column {
  position: absolute;
  right: 0;
  opacity: 0;
}

.table-data-row:hover .buttons-column {
  opacity: 1;
}

.v-data-table__wrapper {
  position: relative;
}
</style> -->
