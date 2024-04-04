<template>
  <v-dialog v-model="dialogVisible" max-width="500px" persistent>
    <template v-slot:activator>
      <v-btn color="primary" @click="openDialog">ADD</v-btn>
    </template>
    <v-card>
      <v-card-title>Add Charecter</v-card-title>
      <v-card-text>
        <v-text-field v-model="newUser.name" label="Name"></v-text-field>
        <v-text-field v-model="newUser.gender" label="Gender"></v-text-field>
        <v-text-field v-model="newUser.birth_year" label="Birth Year"></v-text-field>
        <v-text-field v-model="newUser.height" label="Height"></v-text-field>
        <v-text-field v-model="newUser.mass" label="Mass"></v-text-field>
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
  },
  setup(props, { emit }) {
    const dialogVisible = ref(props.isDialogOpen);
    const newUser = ref({
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
      newUser.value = {
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
      emit("confirm", newUser.value);
      closeDialog();
    };

    return { dialogVisible, openDialog, closeDialog, newUser, confirmAdd };
  },
};
</script>

<style></style>
