<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import FooterWrapper from "./components/footer/FooterWrapper.vue";
import HeaderWrapper from "./components/header/HeaderWrapper.vue";
import usePageStore from "./store/usePageData";
import { useRoute } from "vue-router";

const route = useRoute();
const pageStore = usePageStore();
const isDesktop = ref(window.innerWidth >= 768);
const showHeader = ref(true);
// Function to check the viewport size
const checkViewport = () => {
  if (window.innerWidth >= 768) {
    isDesktop.value = true;

    pageStore.setNumberOfProductsInPage(9);
  } else {
    isDesktop.value = false;

    pageStore.setNumberOfProductsInPage(10);
  }
};

// const modalsStore = useModalStore();

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("resize", checkViewport);
});

watch(route, (newVal) => {
  // console.log(newVal.name);
  // console.log(isDesktop);
  if (newVal.name === "shopping-cart" && !isDesktop.value) {
    showHeader.value = false;
    console.log("dhfkjasdhfkasdhk");
  } else {
    showHeader.value = true;
  }
  // console.log(newVal.name);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkViewport);
});
</script>

<template>
  <div class="font-MyFont">
    <HeaderWrapper v-if="showHeader"></HeaderWrapper>
    <!-- <CattegorieseDesktop class="pt-5"></CattegorieseDesktop> -->
    <router-view />
    <FooterWrapper></FooterWrapper>
  </div>
</template>

<style scoped></style>
