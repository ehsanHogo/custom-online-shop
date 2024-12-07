<script setup lang="ts">
import HeaderShopBrandDesktop from "./desktop/HeaderShopBrandDesktop.vue";
import HeaderUserAccountDesktop from "./desktop/HeaderUserAccountDesktop.vue";
import HeaderSearchBarDesktop from "./desktop/HeaderSearchBarDesktop.vue";
import HeaderSearchBarMobile from "./mobile/HeaderSearchBarMobile.vue";
import useScreenStore from "../../store/useScreenStore";
import CattegoriesMobile from "../products/cattegories/CattegoriesMobile.vue";

const screenStore = useScreenStore();
</script>

<template>
  <div
    v-if="screenStore.isDesktop"
    class="flex py-4 justify-between md:gap-2 md:px-3 xl:px-10"
  >
    <HeaderUserAccountDesktop></HeaderUserAccountDesktop>
    <HeaderSearchBarDesktop></HeaderSearchBarDesktop>
    <HeaderShopBrandDesktop></HeaderShopBrandDesktop>
  </div>

  <div v-else class="flex py-4 px-10 justify-between gap-5 items-center">
    <router-link :to="{ name: 'products' }">
      <img src="../../assets/images/header/LOGO.png" alt="online shop logo"
    /></router-link>
    <HeaderSearchBarMobile></HeaderSearchBarMobile>
    <CattegoriesMobile></CattegoriesMobile>
  </div>
</template>

<style scoped></style>
