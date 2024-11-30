<script setup lang="ts">
import Header from "./components/header/TheHeader.vue";
import Footer from "./components/footer/TheFooter.vue";

import Cattegories from "./components/products/filter/desktop/CattegorieseDesktop.vue";
import CattegorieseDesktop from "./components/products/cattegories/CattegorieseDesktop.vue";
</script>

<template>
  <div class="font-MyFont">
    <Header></Header>
    <!-- <CattegorieseDesktop class="pt-5"></CattegorieseDesktop> -->
    <router-view />
    <Footer></Footer>
  </div>
</template>

<style scoped></style>
