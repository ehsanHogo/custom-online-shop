<script setup lang="ts">
import { onMounted, ref } from "vue";
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

  sortStore.updateSortName(sortItems[index].name);

  sortStore.updateSortField(sortItems[index].sortName);
  toggleModal();
};

const showModal = ref(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
};

onMounted(() => {
  if (sortStore.sortField !== "none") {
    sortStore.updateSortName(
      sortItems.find((item) => item.sortName === sortStore.sortField)?.name ||
        "پرفروش ترین"
    );
  }
});
</script>

<template>
  <button @click="toggleModal" class="flex gap-1 justify-center items-center">
    <img src="../../../assets/images/body/products/sort.png" alt="sort icon" />
    <p>{{ sortStore.sortName }}</p>
  </button>

  <VaModal
    ref="modal"
    v-model="showModal"
    size="large"
    hide-default-actions
    :noDismiss="true"
    blur
  >
    <div
      class="items-between flex flex-col col-span-2 font-MyFont mt-3"
      dir="rtl"
    >
      <div class="flex gap-3 mb-2 justify-start items-center">
        <button @click="toggleModal">
          <img
            src="../../../assets/images/body/products/close-circle.png"
            alt="close icon"
          />
        </button>
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
