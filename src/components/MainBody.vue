<script setup lang="ts">
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

const filterButtons: string[] = [
  "برند",
  "اندازه",
  "رنگ",
  "ارسال امروز",
  "فقط کالاهای موجود",

  "محدوده قیمت",
  "مدل",
  "طرح",
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

      <div class="col-span-1 border rounded-sm p-5 flex flex-col gap-5">
        <div class="flex justify-between">
          <b class="text-redp">حذف فیلتر ها</b>
          <b>فیلتر ها</b>
        </div>

        <div class="flex flex-col gap-6">
          <button
            v-for="(filterButton, index) in filterButtons"
            :key="index"
            class="flex justify-between border-b last:border-none"
          >
            <VaSwitch size="small" v-if="index === 3" v-model="value1" />
            <VaSwitch size="small" v-else-if="index === 4" v-model="value2" />
            <img v-else src="../assets/body/arrow-down.png" alt="arrow down" />

            <p>{{ filterButton }}</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
