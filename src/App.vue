<script setup lang="ts">
import Header from "./components/header/TheHeader.vue";
import Footer from "./components/footer/TheFooter.vue";
import MainBody from "./components/body/MainBody.vue";

import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import ShowProducts from "./views/ShowProducts.vue";
</script>

<template>
  <div class="font-MyFont">
    <ShowProducts></ShowProducts>

    <!-- <router-view /> -->
  </div>
</template>

<style scoped></style>
