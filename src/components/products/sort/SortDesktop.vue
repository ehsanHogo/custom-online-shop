<script setup lang="ts">
import { ref } from "vue";
import { SortType } from "../../../types/interfaces";

import useSortStore from "../../../store/useSortStore";
import { storeToRefs } from "pinia";

interface SortItems {
  name: string;
  sortName: SortType;
}

//store

const sortStore = useSortStore();
const { sortField } = storeToRefs(sortStore);

//****** */

const sortItems: SortItems[] = [
  { name: "پرفروش ترین", sortName: "none" },
  { name: "جدیدترین", sortName: "new-created" },
  { name: "گران ترین", sortName: "price-expensive" },
  { name: "ارزان ترین", sortName: "price-cheap" },
];

const selectedSortItem = ref(
  sortItems.findIndex((item) => item.sortName === sortField.value) + 1
);

const changeItem = (index: number) => {
  selectedSortItem.value = index + 1;
  sortStore.updateSortField(sortItems[index].sortName);
};
</script>

<template>
  <div
    class="justify-start flex gap-5 xsm:col-span-2 md:col-span-3 mb-3 items-start h-min"
    dir="rtl"
  >
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
