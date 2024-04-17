<template>
  <v-container>
    <v-row><h1>Entity:</h1></v-row>
    <v-row>
      <v-col>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" style="border: 1px solid #ccc; padding: 8px">
                  Key
                </th>
                <th class="text-left" style="border: 1px solid #ccc; padding: 8px">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value, key) in entity" :key="key">
                <td style="border: 1px solid #ccc; padding: 8px">{{ key }}</td>
                <td style="border: 1px solid #ccc; padding: 8px">{{ value }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  name: "EntityPage",
  props: {
    entity: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const entity = props.entity;

    return {
      entity,
    };
  },
};
</script>

<style scoped></style>
