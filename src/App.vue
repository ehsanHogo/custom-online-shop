<script setup lang="ts">

import FooterWrapper from "./components/footer/FooterWrapper.vue";
import HeaderWrapper from "./components/header/HeaderWrapper.vue";
</script>

<template>
  <div class="font-MyFont">
    <HeaderWrapper></HeaderWrapper>
    <!-- <CattegorieseDesktop class="pt-5"></CattegorieseDesktop> -->
    <router-view />
    <FooterWrapper></FooterWrapper>
  </div>
</template>

<style scoped></style>
