<template>
  <v-dialog v-model="dialogVisible" max-width="500px" persistent>
    <template v-slot:activator>
      <v-btn color="primary" @click="openDialog">ADD</v-btn>
    </template>
    <v-card>
      <v-card-title>Add Charecter</v-card-title>
      <v-card-text>
        <v-text-field
          v-for="header in headers"
          :key="header.key"
          :label="header.title"
          v-model="newItem[header.key]"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="confirmAdd">Confirm</v-btn>
        <v-btn @click="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { reactive, ref, watch } from "vue";

export default {
  name: "PersonAddDialog",
  props: {
    isDialogOpen: {
      type: Boolean,
      required: true,
    },
    headers: {
      typeof: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const headers = reactive(props.headers);
    const dialogVisible = ref(props.isDialogOpen);
    const newItem = ref({
      name: "",
      gender: "",
      birth_year: "",
      height: "",
      mass: "",
    });

    const openDialog = () => {
      emit("openDialog");
    };

    const closeDialog = () => {
      emit("closeDialog");
      newItem.value = {
        name: "",
        gender: "",
        birth_year: "",
        height: "",
        mass: "",
      };
    };

    watch(
      () => props.isDialogOpen,
      (newValue) => {
        dialogVisible.value = newValue;
      }
    );

    const confirmAdd = () => {
      //Of course should have proper validation here
      emit("confirm", newItem.value);
      closeDialog();
    };

    return { dialogVisible, openDialog, closeDialog, newItem, confirmAdd };
  },
};
</script>

<style></style>
