<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import FooterDesktop from "./desktop/FooterDesktop.vue";
import FooterMobile from "./mobile/FooterMobile.vue";

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
  <FooterDesktop v-if="isDesktop"></FooterDesktop>

  <FooterMobile v-else></FooterMobile>
</template>
