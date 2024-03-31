<template>
  <v-dialog v-model="dialogVisible" max-width="500px" persistent>
    <v-card>
      <v-card-title>Edit Charecter</v-card-title>
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
import { ref, watch, reactive } from "vue";

export default {
  name: "CustomEditDialog",
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

    const closeDialog = () => {
      emit("closeDialog");
    };

    watch(
      () => props.isDialogOpen,
      (newValue) => {
        dialogVisible.value = newValue;
      }
    );

    const confirmAdd = () => {
      closeDialog();

      emit("confirm", editItemRef);
    };

    return { dialogVisible, closeDialog, confirmAdd, newUser };
  },
};
</script>

<style></style>
