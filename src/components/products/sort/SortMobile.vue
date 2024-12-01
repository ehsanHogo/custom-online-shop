<script setup lang="ts">
import { ref } from "vue";
import { SortType } from "../../../types/interfaces";

import useSortStore from "../../../store/useSortStore";
import { storeToRefs } from "pinia";
import { useModalStore } from "../../../store/useModalsStore";

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
  modalsStore.setSelectedSort(sortItems[index].name);
  sortStore.updateSortField(sortItems[index].sortName);
  modalsStore.toggleSortModal();    
};

const modalsStore = useModalStore();
</script>

<template>
  <div></div>

  <VaModal
    ref="modal"
    v-model="modalsStore.sortModal"
    fullscreen
    hide-default-actions
    :noDismiss="true"
  >
    <div
      class="items-between flex flex-col col-span-2 font-MyFont mt-3"
      dir="rtl"
    >
      <div class="flex gap-3 mb-2 justify-start items-center">
        <!-- <button @click="() => modalsStore.toggleSortModal()">
          <img
            src="../../../assets/images/body/products/close-circle.png"
            alt="close icon"
          />
        </button> -->
        <p>مرتب سازی براساس</p>
      </div>
      <button
        @click="changeItem(index)"
        v-for="(item, index) in sortItems"
        class="flex justify-between"
      >
        <b>
          {{ item.name }}
        </b>

        <img
          v-if="index + 1 === selectedSortItem"
          src="../../../assets/images/body/products/tick-circle.png"
          alt="select icon"
        />
      </button>
    </div>
  </VaModal>
</template>
