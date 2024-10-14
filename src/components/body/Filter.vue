<script setup lang="ts">
import { ref } from "vue";

const sendingToday = ref(false);
const onlyExist = ref(false);

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
  <div class="col-span-1 border rounded-sm p-5 flex flex-col gap-5 h-fit">
    <div class="flex justify-between">
      <button><b class="text-redp">حذف فیلتر ها</b></button>
      <b>فیلتر ها</b>
    </div>

    <div class="flex flex-col gap-6">
      <button
        v-for="(filterButton, index) in filterButtons"
        :key="index"
        class="flex justify-between border-b last:border-none pb-2"
      >
        <VaSwitch size="small" v-if="index === 3" v-model="sendingToday" />
        <VaSwitch size="small" v-else-if="index === 4" v-model="onlyExist" />
        <img v-else src="../../assets/body/arrow-down.png" alt="arrow down" />

        <p>{{ filterButton }}</p>
      </button>
    </div>
  </div>
</template>
