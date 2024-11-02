<script setup lang="ts">
import Header from "./components/header/TheHeader.vue";
import Footer from "./components/footer/TheFooter.vue";

import Cattegories from "./components/products/Cattegories.vue";
</script>

<template>
  <div class="font-MyFont">
    <Header></Header>
    <Cattegories class="pt-5"></Cattegories>
    <!-- <MainBody></MainBody> -->
    <router-view />

    <Footer></Footer>

    <!-- <router-view /> -->
  </div>
</template>

<style scoped></style>
