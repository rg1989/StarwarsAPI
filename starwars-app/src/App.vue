<template>
  <v-app>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-btn icon="mdi-home" variant="text" @click="navigateHome"></v-btn>
        <v-toolbar-title>{{ currentRouteName }}</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container><router-view /></v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import router from "./router";
import { ref, onMounted, watch } from "vue";

export default {
  name: "App",
  setup() {
    const currentRouteName = ref("");

    onMounted(() => {
      currentRouteName.value = router.currentRoute.value.name;
    });
    watch(
      () => router.currentRoute.value.name,
      async (newRouteName) => {
        currentRouteName.value = newRouteName;
      }
    );
    const navigateHome = () => {
      router.push({ name: "home" });
    };

    return {
      currentRouteName,
      navigateHome,
    };
  },
};
</script>

<style scoped>
.white-icon .v-icon {
  color: white !important;
}
</style>
