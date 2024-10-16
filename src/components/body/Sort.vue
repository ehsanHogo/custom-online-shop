<script setup lang="ts">
import { ref } from "vue";
import { SortType } from "./MainBody.vue";

const emit = defineEmits(["data-sort"]);

interface SortItems {
  name: string;
  sortName: SortType;
}
const sortItems: SortItems[] = [
  // "پربازدیدترین",
  { name: "پرفروش ترین", sortName: "none" },
  { name: "جدیدترین", sortName: "new-created" },
  { name: "گران ترین", sortName: "price-expensive" },
  { name: "ارزان ترین", sortName: "price-cheap" },
];
const selectedSortItem = ref(1);
const changeItem = (index: number) => {
  selectedSortItem.value = index + 1;
  sendDataToParrent(sortItems[index]);
};

const sendDataToParrent = (newSortItem: SortItems) => {
  emit("data-sort", newSortItem.sortName);
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
        {{ item.name }}
      </p>
    </button>
  </div>
</template>
