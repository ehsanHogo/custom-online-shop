<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import FooterWrapper from "./components/footer/FooterWrapper.vue";
import HeaderWrapper from "./components/header/HeaderWrapper.vue";
import usePageStore from "./store/usePageData";
import { useRoute } from "vue-router";
import useScreenStore from "./store/useScreenStore";

const route = useRoute();
const pageStore = usePageStore();

const screenStore = useScreenStore();

const showHeader = ref(true);

const checkViewport = () => {
  if (window.innerWidth >= 821) {
    screenStore.setIsDesktop(true);
    showHeader.value = true;
    pageStore.setNumberOfProductsInPage(9);
  } else {
    screenStore.setIsDesktop(false);

    pageStore.setNumberOfProductsInPage(10);

    if (route.name === "shopping-cart") {
      showHeader.value = false;
    } else {
      showHeader.value = true;
    }
  }
};

// Lifecycle hooks
onMounted(() => {
  checkViewport();
  window.addEventListener("resize", checkViewport);
});

watch(route, (newVal) => {
  if (newVal.name === "shopping-cart" && !screenStore.isDesktop) {
    showHeader.value = false;
  } else {
    showHeader.value = true;
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", checkViewport);
});
</script>

<template>
  <div class="font-MyFont">
    <HeaderWrapper v-if="showHeader"></HeaderWrapper>
    <router-view />
    <FooterWrapper></FooterWrapper>
  </div>
</template>

<style scoped></style>
