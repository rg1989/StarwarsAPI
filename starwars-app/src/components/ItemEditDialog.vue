<template>
  <v-dialog v-model="dialogVisible" max-width="500px" persistent>
    <v-card>
      <v-card-title>Edit Charecter</v-card-title>
      <v-card-text>
        <v-text-field
          v-for="header in headers"
          :key="header.key"
          :label="header.title"
          v-model="editedItem[header.key]"
        ></v-text-field>
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
    headers: {
      typeof: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const headers = reactive(props.headers);
    const dialogVisible = ref(props.isDialogOpen);
    const editedItem = ref({ ...props.editableCharacter });

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
        editedItem.value = { ...newValue };
      }
    );

    const confirmEdit = () => {
      closeDialog();
      //Of course should have proper validation here
      emit("confirm", editedItem.value);
    };

    return { dialogVisible, openDialog, closeDialog, editedItem, confirmEdit };
  },
};
</script>

<style></style>
