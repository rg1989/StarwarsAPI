<template>
  <div>
    <v-container v-if="!loading">
      <h1 class="display-1">Charecters:</h1>
      <CustomEditableTable
        v-if="headers"
        :headers="headers"
        :items="people"
        @deleteItem="deleteItem"
        @editItem="editItemDialog"
      />
      <CustomAddDialog
        :isDialogOpen="isAddDialog"
        @openDialog="openAddDialog"
        @closeDialog="closeAddDialog"
        @confirm="addNewUser"
      />
      <CustomEditDialog
        :isDialogOpen="isEditDialog"
        @closeDialog="closeEditDialog"
        @confirm="addNewUser"
      />
    </v-container>
    <v-container class="loader" v-else>
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </v-container>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import CustomEditableTable from "../components/CustomEditableTable.vue";
import CustomAddDialog from "../components/CustomAddDialog.vue";
import CustomEditDialog from "../components/CustomEditDialog.vue";

export default {
  name: "PeoplePage",
  components: {
    CustomEditableTable,
    CustomAddDialog,
    CustomEditDialog,
  },
  setup(props) {
    const headers = ref([
      { key: "name", align: "start", title: "Name", value: "name" },
      { key: "gender", title: "Gender", value: "gender" },
      { key: "birth_year", title: "Birth Year", value: "birth_year" },
      { key: "height", title: "Height", value: "height" },
      { key: "mass", title: "Mass", value: "mass" },
    ]);
    const loading = ref(true);
    const store = useStore();
    const people = computed(() => store.getters.getPeople.results ?? []);
    const isAddDialog = ref(false);
    const isEditDialog = ref(false);

    onMounted(async () => {
      try {
        loading.value = true;
        await store.dispatch("fetchPeople");
        loading.value = false;
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    });

    const editItemDialog = (item) => {
      isEditDialog.value = true;
      store.dispatch("editPerson", item);
    };

    const closeAddDialog = () => {
      isAddDialog.value = false;
    };

    const closeEditDialog = () => {
      isEditDialog.value = false;
    };

    const openAddDialog = () => {
      isAddDialog.value = true;
    };

    const addNewUser = (newUser) => {
      store.dispatch("addPerson", newUser);
    };

    const deleteItem = (item) => {
      console.log("delete" + item.name);
      store.dispatch("deletePerson", item);
    };

    return {
      headers,
      loading,
      people,
      editItemDialog,
      deleteItem,
      isAddDialog,
      closeAddDialog,
      openAddDialog,
      addNewUser,
      isEditDialog,
      closeEditDialog,
    };
  },
};
</script>

<style>
.loader {
  text-align: center;
}
</style>
