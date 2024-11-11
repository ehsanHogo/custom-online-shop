<script setup lang="ts">
import { computed, toRef } from "vue";
import usePageStore from "../../store/usePageData";
import { storeToRefs } from "pinia";
import { useUpdateAllPageData } from "../../composables/useUpdatePageData";

interface MyProps {
  numberOfPages: number;
  stepNum: number;
}

//store

const pageStore = usePageStore();

//***** */

//composable

const { updateAllPageData, updateCurrentPageData } = useUpdateAllPageData();

const props = defineProps<MyProps>();

// setting with fetched data from parrent
const totalPage = toRef(props, "numberOfPages");
// set by parrent interest
const stepSize = props.stepNum;

const { currentPage } = storeToRefs(pageStore);
const { startIndex } = storeToRefs(pageStore);
const { endIndex } = storeToRefs(pageStore);

// general

const pages = computed(() => {
  return [...Array(totalPage.value)].map((_, i) => i + 1);
});

const changePage = (page: number) => {
  if (page === 1) {
    // Reset to the first set of pages
    updateAllPageData(page, 0, Math.min(stepSize - 1, totalPage.value));
  } else if (page === totalPage.value) {
    // Show the last set of pages
    updateAllPageData(
      page,
      Math.max(0, totalPage.value - stepSize - 1),
      totalPage.value - 2
    );
  } else {
    updateCurrentPageData(page);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPage.value) {
    if (currentPage.value + 1 > pages.value[endIndex.value]) {
      updateAllPageData(
        currentPage.value + 1,
        startIndex.value + stepSize,
        Math.min(totalPage.value - 1, endIndex.value + stepSize)
      );
    } else {
      updateCurrentPageData(currentPage.value + 1);
    }
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    if (currentPage.value - 1 < pages.value[startIndex.value]) {
      updateAllPageData(
        currentPage.value - 1,
        Math.max(0, startIndex.value - stepSize),
        startIndex.value - 1
      );
    } else {
      updateCurrentPageData(currentPage.value - 1);
    }
  }
};

// Slice pages to display in pagination bar
const slicePages = computed<number[]>(() => {
  return pages.value.slice(
    Math.max(1, startIndex.value),
    Math.min(endIndex.value + 1, totalPage.value - 1)
  );
});
</script>

<template>
  <div class="flex justify-center items-center gap-5 col-span-3">
    <button @click="nextPage">
      <img src="../../assets/body/arrow-left.png" alt="left arrow" />
    </button>
    <div class="flex gap-3 border border-myGray-4 rounded-lg p-3" dir="rtl">
      <button
        @click="changePage(pages[0])"
        class="border border-myGray-8 w-8 h-8 rounded-xl flex justify-center items-center"
        :class="{ 'bg-Tint-5': 1 === currentPage }"
      >
        <b> 1</b>
      </button>

      <div v-if="startIndex !== 0 && pages[stepNum - 1] < totalPage">
        <b>...</b>
      </div>

      <button
        @click="changePage(page)"
        v-for="(page, index) in slicePages"
        :key="index"
        class="border border-myGray-8 w-8 h-8 rounded-xl flex justify-center items-center"
        :class="{ 'bg-Tint-5': page === currentPage }"
      >
        <b> {{ page }}</b>
      </button>
      <div
        v-if="
          pages[endIndex] !== totalPage - 1 &&
          totalPage > 1 &&
          pages[stepNum - 1] < totalPage
        "
      >
        <b>...</b>
      </div>

      <button
        v-if="totalPage > 1"
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
