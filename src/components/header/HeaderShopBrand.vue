<script setup lang="ts">


</script>

<template>
  <router-link
    :to="{ name: 'products' }"
    class="flex justify-end items-center gap-2 text-myGray-9"
  >
    <div class="flex flex-col">
      <img
        src="../../assets/images/siteBrand/custom-brand-name.png"
        alt="online shop brand"
      />
      <b class="text-nowrap">فروشگاه اینترنتی</b>
    </div>
    <img src="../../assets/images/siteBrand/LOGO.png" alt="online shop logo" />
  </router-link>
</template>
