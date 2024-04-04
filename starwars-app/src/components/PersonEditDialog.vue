<template>
  <v-dialog v-model="dialogVisible" max-width="500px" persistent>
    <v-card>
      <v-card-title>Edit Charecter</v-card-title>
      <v-card-text>
        <v-text-field v-model="editedUser.name" label="Name"></v-text-field>
        <v-text-field v-model="editedUser.gender" label="Gender"></v-text-field>
        <v-text-field v-model="editedUser.birth_year" label="Birth Year"></v-text-field>
        <v-text-field v-model="editedUser.height" label="Height"></v-text-field>
        <v-text-field v-model="editedUser.mass" label="Mass"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="confirmEdit">Confirm</v-btn>
        <v-btn @click="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, reactive, watch } from "vue";

export default {
  name: "PersonEditDialog",
  props: {
    isDialogOpen: {
      type: Boolean,
      required: true,
    },
    editableCharacter: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const dialogVisible = ref(props.isDialogOpen);
    const editedUser = ref({ ...props.editableCharacter });

    const openDialog = () => {
      emit("openDialog");
    };

    const closeDialog = () => {
      emit("closeDialog");
    };

    watch(
      () => props.isDialogOpen,
      (newValue) => {
        dialogVisible.value = newValue;
      }
    );

    watch(
      () => props.editableCharacter,
      (newValue) => {
        editedUser.value = { ...newValue };
      }
    );

    const confirmEdit = () => {
      closeDialog();
      //Of course should have proper validation here
      emit("confirm", editedUser.value);
    };

    return { dialogVisible, openDialog, closeDialog, editedUser, confirmEdit };
  },
};
</script>

<style></style>
