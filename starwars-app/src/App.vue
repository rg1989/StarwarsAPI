<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import HomePage from "./home/HomePage.vue";

export default {
  name: "App",

  components: {
    HomePage,
  },
};
</script>
