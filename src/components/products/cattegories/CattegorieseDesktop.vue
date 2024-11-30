<script setup lang="ts">
const categories: string[] = [
  "پوشاک",
  "لوازم خانه",
  "قاب موبایل",
  "اکسسوری",
  "مدرسه و اداره",
  "کارت و پوستر",
  "جشن و مهمانی",
];
</script>

<template>
  <div class="flex w-full justify-between">
    <button
      class="text-myGray-9"
      v-for="(cat, index) in categories"
      :key="index"
    >
      <b class=""> {{ cat }}</b>
    </button>
    <button class="bg-redp flex p-2 rounded-sm">
      <p class="text-white">!خودت طراحیش کن</p>
      <img
        src="../../../assets/images/body/products/magicpen.png"
        alt="magic pen icon"
      />
    </button>
  </div>
</template>
