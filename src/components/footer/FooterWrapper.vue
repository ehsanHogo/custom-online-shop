<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import FooterDesktop from "./desktop/FooterDesktop.vue";
import FooterMobile from "./mobile/FooterMobile.vue";
import useScreenStore from "../../store/useScreenStore";

const screenStore = useScreenStore();
</script>

<template>
  <FooterDesktop v-if="screenStore.isDesktop"></FooterDesktop>

  <FooterMobile v-else></FooterMobile>
</template>
