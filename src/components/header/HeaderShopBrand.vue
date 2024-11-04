<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

// const route = useRoute();

// const newPathWithQuery = computed(() => {
//   console.log(route.query);

//   return {
//     path: "/custom-online-shop/",
//     query: { ...route.query },
//   };
// });
</script>

<template>
  <router-link
    :to="{ name: 'products' }"
    class="flex justify-end items-center gap-2 text-myGray-9"
  >
    <div class="flex flex-col">
      <img
        src="../../assets/siteBrand/custom-brand-name.png"
        alt="online shop brand"
      />
      <b class="text-nowrap">فروشگاه اینترنتی</b>
    </div>
    <img src="../../assets/siteBrand/LOGO.png" alt="online shop logo" />
  </router-link>
</template>
