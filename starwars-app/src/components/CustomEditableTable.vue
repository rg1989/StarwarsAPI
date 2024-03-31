<template>
  <div class="table-container">
    <v-data-table :headers="headers" :items="items">
      <template v-slot:headers>
        <tr>
          <th v-for="(header, index) in headers" :key="index" class="font-weight-bold">
            {{ header.title }}
          </th>
        </tr>
      </template>
      <template v-slot:item="{ item }">
        <tr class="table-data-row">
          <!-- Render table cells for each item property -->
          <td>{{ item.name }}</td>
          <td>{{ item.gender }}</td>
          <td>{{ item.birth_year }}</td>
          <td>{{ item.height }}</td>
          <td>{{ item.mass }}</td>

          <td class="buttons-column">
            <v-row no-gutters>
              <v-col cols="6">
                <v-btn icon class="edit-button" @click="editItem(item)">
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
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "CustomEditableTable",
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: false,
    },
  },
  setup(props, { emit }) {
    const editItem = (item) => {
      emit("editItem", item);
    };

    const deleteItem = (item) => {
      emit("deleteItem", item);
    };

    return {
      editItem,
      deleteItem,
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
