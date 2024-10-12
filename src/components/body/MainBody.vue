<script setup lang="ts">
import Filter from "./Filter.vue";
import { ref } from "vue";

const value1 = ref(false);
const value2 = ref(false);
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
  <div class="p-5">
    <div class="flex justify-around">
      <button
        v-for="(cat, index) in categories"
        :key="index"
        class="text-myGray-9"
      >
        {{ cat }}
      </button>
      <button class="bg-redp flex p-1 rounded-sm">
        <p class="text-white">!خودت طراحیش کن</p>
        <img src="../assets/body/magicpen.png" alt="" />
      </button>
    </div>

    <div class="grid grid-cols-4 p-5 gap-4">
      <div class="bg-blue-600 col-span-3">
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <Filter></Filter>
    </div>
  </div>
</template>

<style scoped></style>
