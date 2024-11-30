<script setup lang="ts">
import HeaderUserAccount from "./desktop/HeaderUserAccountDesktop.vue";
import HeaderSearchBar from "./desktop/HeaderSearchBarDesktop.vue";
import HeaderShopBrand from "./desktop/HeaderShopBrandDesktop.vue";
import { onMounted, onUnmounted, ref } from "vue";
import HeaderMenuMobile from "./mobile/HeaderMenuMobile.vue";
import HeaderShopBrandDesktop from "./desktop/HeaderShopBrandDesktop.vue";
import HeaderUserAccountDesktop from "./desktop/HeaderUserAccountDesktop.vue";
import HeaderSearchBarDesktop from "./desktop/HeaderSearchBarDesktop.vue";
import HeaderSearchBarMobile from "./mobile/HeaderSearchBarMobile.vue";

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
  <div
    v-if="isDesktop"
    class="flex py-4 justify-between md:gap-2 md:px-3 xl:px-10"
  >
    <HeaderUserAccountDesktop></HeaderUserAccountDesktop>
    <HeaderSearchBarDesktop></HeaderSearchBarDesktop>
    <HeaderShopBrandDesktop></HeaderShopBrandDesktop>
    <!-- <HeaderOption></HeaderOption> -->
  </div>

  <div v-else class="flex p-10 justify-between gap-5 items-center">
    <img src="../../assets/images/header/LOGO.png" alt="online shop logo" />
    <HeaderSearchBarMobile></HeaderSearchBarMobile>
    <HeaderMenuMobile></HeaderMenuMobile>
  </div>
</template>

<style scoped></style>
