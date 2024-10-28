<script setup lang="ts">
import Header from "./components/header/TheHeader.vue";
import Footer from "./components/footer/TheFooter.vue";
import MainBody from "./components/body/MainBody.vue";

import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
</script>

<template>
  <div class="font-MyFont">
    <router-link :to="{ name: 'products' }">go products</router-link>
    <br />
    <router-link :to="{ name: '404' }">go 404</router-link>

    <router-view />
  </div>
</template>

<style scoped></style>
