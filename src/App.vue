<script setup lang="ts">
import Header from "./components/header/TheHeader.vue";

import TheFooterDesktop from "./components/footer/desktop/FooterDesktop.vue";
import FooterWrapper from "./components/footer/FooterWrapper.vue";
</script>

<template>
  <div class="font-MyFont">
    <Header></Header>
    <!-- <CattegorieseDesktop class="pt-5"></CattegorieseDesktop> -->
    <router-view />
    <FooterWrapper></FooterWrapper>
  </div>
</template>

<style scoped></style>
