<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import CattegoriesMobile from "./CattegoriesMobile.vue";
import CattegorieseDesktop from "./CattegorieseDesktop.vue";

const isDesktop = ref(window.innerWidth >= 768);

// Function to check the viewport size
const checkViewport = () => {
  isDesktop.value = window.innerWidth >= 768;
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("resize", checkViewport);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkViewport);
});
</script>

<template>
  <CattegorieseDesktop v-if="isDesktop"></CattegorieseDesktop>
  <CattegoriesMobile v-else></CattegoriesMobile>
</template>
