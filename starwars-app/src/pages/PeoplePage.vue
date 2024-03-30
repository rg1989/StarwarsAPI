<template>
  <div>
    <v-container v-if="!loading">
      <v-row>
        <v-col>
          <h1 class="display-1">Charecters:</h1>
          <v-data-table
            :headers="headers"
            :items="people"
            :search="search"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <div class="loader" v-else>
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "PeoplePage",
  setup(props) {
    const headers = ref([
      { key: "name", align: "start", title: "Name", value: "name" },
      { key: "gender", title: "Gender", value: "gender" },
      { key: "birth_year", title: "Birth Year", value: "birth_year" },
      { key: "height", title: "Height", value: "height" },
      { key: "mass", title: "Mass", value: "mass" },
    ]);
    const loading = ref(false);
    const store = useStore();
    const people = computed(() => store.getters.getPeople.results ?? []);

    onMounted(async () => {
      try {
        loading.value = true;
        await store.dispatch("fetchPeople");
        loading.value = false;
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    });

    return {
      headers,
      loading,
      people,
    };
  },
};
</script>

<style>
.loader {
  text-align: center;
}
</style>
