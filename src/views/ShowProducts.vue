<script setup lang="ts">
import Header from "../components/header/TheHeader.vue";
import Footer from "../components/footer/TheFooter.vue";
import MainBody from "../components/products/MainBody.vue";
import { ref } from "vue";
import Cattegories from "../components/products/Cattegories.vue";
</script>
<template>
  <!-- <router-link :to="{ name: 'products' }"></router-link> -->
  <Header></Header>
  <Cattegories class="pt-5"></Cattegories>
  <!-- <MainBody></MainBody> -->
  <router-view />

  <Footer></Footer>
</template>
