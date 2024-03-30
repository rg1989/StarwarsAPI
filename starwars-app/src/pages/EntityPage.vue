<template>
  <h1>Entity Page: {{ name }}</h1>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  name: "EntityPage",
  setup() {
    const route = useRoute();
    const name = computed(() => route.params.name);

    return {
      name,
    };
  },
};
</script>

<style scoped></style>
