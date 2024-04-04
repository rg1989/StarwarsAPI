<template>
  <v-container class="table-container">
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :items-per-page-options="[itemsPerPage]"
      item-value="name"
      @update:options="loadItems"
    >
      <template v-slot:headers>
        <tr>
          <th v-for="(header, index) in headers" :key="index" class="font-weight-bold">
            {{ header.title }}
          </th>
        </tr>
      </template>
      <template v-slot:item="{ item, index }">
        <tr class="table-data-row">
          <td v-for="(header, index) in headers" :key="index">
            {{ item[header.value] }}
          </td>

          <td class="buttons-column">
            <v-row no-gutters>
              <v-col cols="6">
                <v-btn icon class="edit-button" @click="openEditDialog(item, index)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn icon class="delete-button" @click="deleteItem(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </td>
        </tr>
      </template></v-data-table-server
    >
    <PersonAddDialog
      :isDialogOpen="isAddDialog"
      @openDialog="openAddDialog"
      @closeDialog="closeAddDialog"
      @confirm="addItem"
    />
    <PersonEditDialog
      :isDialogOpen="isEditDialog"
      :editableCharacter="editableCharacter"
      @closeDialog="closeEditDialog"
      @confirm="editItem"
    />
  </v-container>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import PersonAddDialog from "./PersonAddDialog.vue";
import PersonEditDialog from "./PersonEditDialog.vue";

export default {
  name: "EditableServerTable",
  components: {
    PersonAddDialog,
    PersonEditDialog,
  },
  setup() {
    const itemsPerPage = ref(10);
    const headers = reactive([
      { key: "name", align: "start", title: "Name", value: "name" },
      { key: "gender", title: "Gender", value: "gender" },
      { key: "birth_year", title: "Birth Year", value: "birth_year" },
      { key: "height", title: "Height", value: "height" },
      { key: "mass", title: "Mass", value: "mass" },
    ]);
    const serverItems = ref([]);
    const loading = ref(true);
    const totalItems = ref(0);

    const editableCharacter = ref({});
    const isAddDialog = ref(false);
    const isEditDialog = ref(false);
    const editableItemIndex = ref(0);

    const store = useStore();

    const loadItems = async ({ page, itemsPerPage }) => {
      try {
        loading.value = true;
        const response = await store.dispatch("fetchPeopleByPage", page);
        serverItems.value = response.results;
        totalItems.value = response.count;
        loading.value = false;
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };

    // ADD CHARACTER
    const closeAddDialog = () => {
      isAddDialog.value = false;
    };

    const openAddDialog = () => {
      isAddDialog.value = true;
    };

    const addItem = (item) => {
      store.dispatch("addCharacter", item);
    };

    //DELETE CHARACTER
    const deleteItem = (item) => {
      store.dispatch("deleteCharacter", item);
    };

    //EDIT CHARACTER
    const closeEditDialog = () => {
      isEditDialog.value = false;
    };

    const openEditDialog = (item, index) => {
      editableCharacter.value = item;
      editableItemIndex.value = index;
      isEditDialog.value = true;
    };

    const editItem = (editedCharacter) => {
      store.dispatch("editCharacter", {
        value: editedCharacter,
        index: editableItemIndex.value,
      });
    };

    return {
      itemsPerPage,
      headers,
      serverItems,
      loading,
      totalItems,
      loadItems,
      closeAddDialog,
      openAddDialog,
      addItem,
      isAddDialog,
      deleteItem,
      closeEditDialog,
      openEditDialog,
      editItem,
      isEditDialog,
      editableCharacter,
      editableItemIndex,
    };
  },
};
</script>

<style>
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
</style>
