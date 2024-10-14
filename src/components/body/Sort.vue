<script setup lang="ts">
import { ref } from "vue";

const sortItems = [
  "پربازدیدترین",
  "جدیدترین",
  "پرفروش ترین",
  "گران ترین",
  "ارزان ترین",
];
const selectedSortItem = ref(1);
const changeItem = (index: number) => {
  selectedSortItem.value = index + 1;
};
</script>

<template>
  <div class="justify-start flex gap-5 col-span-3 mb-3 items-start" dir="rtl">
    <button
      @click="changeItem(index)"
      v-for="(item, index) in sortItems"
      :class="{
        'border-b-redp border-b-2': index + 1 === selectedSortItem,
      }"
    >
      <p
        :class="{
          'text-redp pb-1': index + 1 === selectedSortItem,
          'text-myGray-10': index + 1 !== selectedSortItem,
        }"
      >
        {{ item }}
      </p>
    </button>
  </div>
</template>
