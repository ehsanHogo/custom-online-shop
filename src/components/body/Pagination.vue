<script setup lang="ts">
import { computed, ref } from "vue";
import leftArrow from "../../assets/body/arrow-left.png";

const currentPage = ref(1);
const totalPage = 50;
const firstPageIndex = ref(0);
const firstPage = ref(1);
const lastPageIndex = ref(8);
const lastPage = ref(10);

const pages = [...Array(totalPage - 2)].map((_, i) => i + 2);
console.log(pages);

const changePage = (page: number) => {
  if (page === 1) {
    firstPage.value = 1;
    lastPage.value = 10;
    firstPageIndex.value = 0;
    lastPageIndex.value = 8;
  } else if (page === 50) {
    firstPage.value = 41;
    lastPage.value = 50;
    firstPageIndex.value = 39;
    lastPageIndex.value = 48;
  }
  currentPage.value = page;
};

const nextPage = () => {
  if (currentPage.value !== totalPage) {
    if (currentPage.value === lastPage.value) {
      firstPageIndex.value = lastPageIndex.value + 1;
      lastPageIndex.value = lastPageIndex.value + 10;

      firstPage.value = lastPage.value + 1;
      lastPage.value = lastPage.value + 10;
    }
    currentPage.value = currentPage.value + 1;
  }
};

const prevPage = () => {
  console.log("current : ", currentPage.value);
  console.log("firstIndex : ", firstPageIndex.value);

  if (currentPage.value !== 1) {
    if (currentPage.value === firstPage.value) {
      lastPageIndex.value = firstPageIndex.value - 1;
      if (firstPage.value === 11) {
        firstPageIndex.value = firstPageIndex.value - 9;
      } else {
        firstPageIndex.value = firstPageIndex.value - 10;
      }

      lastPage.value = firstPage.value - 1;
      firstPage.value = firstPage.value - 10;
    }
    currentPage.value = currentPage.value - 1;
  }
};

const slicePages = computed(() =>
  pages.slice(firstPageIndex.value, lastPageIndex.value + 1)
);
</script>

<template>
  <div class="flex justify-center items-center gap-5">
    <button @click="nextPage">
      <img src="../../assets/body/arrow-left.png" alt="left arrow" />
    </button>
    <div class="flex gap-3 border border-myGray-4 rounded-lg p-3" dir="rtl">
      <button
        @click="changePage(1)"
        class="border border-myGray-8 w-8 h-8 rounded-xl flex justify-center items-center"
        :class="{ 'bg-Tint-5': 1 === currentPage }"
      >
        <b> 1</b>
      </button>

      <div v-if="firstPage !== 1"><b>...</b></div>

      <button
        @click="changePage(page)"
        v-for="(page, index) in slicePages"
        :key="index"
        class="border border-myGray-8 w-8 h-8 rounded-xl flex justify-center items-center"
        :class="{ 'bg-Tint-5': page === currentPage }"
      >
        <b> {{ page }}</b>
      </button>

      <div v-if="lastPage !== totalPage"><b>...</b></div>
      <button
        @click="changePage(totalPage)"
        class="border border-myGray-8 w-8 h-8 rounded-xl flex justify-center items-center"
        :class="{ 'bg-Tint-5': totalPage === currentPage }"
      >
        <b> {{ totalPage }}</b>
      </button>
    </div>

    <button @click="prevPage">
      <img src="../../assets/body/arrow-right.png" alt="right arrow" />
    </button>
  </div>
</template>
