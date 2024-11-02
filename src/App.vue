<script setup lang="ts">
import Header from "./components/header/TheHeader.vue";
import Footer from "./components/footer/TheFooter.vue";
import MainBody from "./components/body/MainBody.vue";

import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
</script>

<template>
  <div class="font-MyFont">

  

    <router-view />
  </div>
</template>

<style scoped></style>
