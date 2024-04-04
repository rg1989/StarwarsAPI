<template>
  <v-app>
    <v-main>
      {{ currentRouteName }}
      <router-view />
    </v-main>
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

    return {
      currentRouteName,
    };
  },
};
</script>
