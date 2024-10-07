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

const filterButtons: string[] = [
  "برند",
  "اندازه",
  "رنگ",
  "محدوده قیمت",
  "مدل",
  "طرح",
];
</script>

<template>
  <div class="">
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

    <div class="grid grid-cols-4">
      <div class="bg-blue-600 col-span-3">
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div class="col-span-1">
        <div class="flex justify-around">
          <p>حذف فیلتر ها</p>
          <p>فیلتر ها</p>
        </div>

        <div class="flex flex-col">
          <button
            v-for="(filterButton, index) in filterButtons"
            :key="index"
            class="flex justify-between px-16"
          >
            <img src="../assets/body/arrow-down.png" alt="" />
            <p>{{ filterButton }}</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
