<script setup lang="ts">
import { computed, toRef } from "vue";
import usePageStore from "../../store/usePageData";
import { storeToRefs } from "pinia";

interface MyProps {
  numberOfPages: number;
  stepNum: number;
}

//store

const pageStore = usePageStore();

//***** */

//composable

// const props = defineProps<MyProps>();

// setting with fetched data from parrent
// const numberOfPage = toRef(props, "numberOfPages");
// set by parrent interest
// const stepNum.value = props.stepNum;

const { pageData , numberOfPage, stepNum} = storeToRefs(pageStore);

// general

const pages = computed(() => {
  return [...Array(numberOfPage.value)].map((_, i) => i + 1);
});

const changePage = (page: number) => {
  if (page === 1) {
    // Reset to the first set of pages
    pageStore.updateAllPageData(
      page,
      0,
      Math.min(stepNum.value - 1, numberOfPage.value)
    );
  } else if (page === numberOfPage.value) {
    // Show the last set of pages
    pageStore.updateAllPageData(
      page,
      Math.max(0, numberOfPage.value - stepNum.value - 1),
      numberOfPage.value - 2
    );
  } else {
    pageStore.setCurrentPage(page);
  }
};

const nextPage = () => {
  if (pageData.value.currentPage < numberOfPage.value) {
    if (pageData.value.currentPage + 1 > pages.value[pageData.value.endIndex]) {
      pageStore.updateAllPageData(
        pageData.value.currentPage + 1,
        pageData.value.startIndex + stepNum.value,
        Math.min(numberOfPage.value - 1, pageData.value.endIndex + stepNum.value)
      );
    } else {
      pageStore.setCurrentPage(pageData.value.currentPage + 1);
    }
  }
};

const prevPage = () => {
  if (pageData.value.currentPage > 1) {
    if (
      pageData.value.currentPage - 1 <
      pages.value[pageData.value.startIndex]
    ) {
      pageStore.updateAllPageData(
        pageData.value.currentPage - 1,
        Math.max(0, pageData.value.startIndex - stepNum.value),
        pageData.value.startIndex - 1
      );
    } else {
      pageStore.setCurrentPage(pageData.value.currentPage - 1);
    }
  }
};

// Slice pages to display in pagination bar
const slicePages = computed<number[]>(() => {
  return pages.value.slice(
    Math.max(1, pageData.value.startIndex),
    Math.min(pageData.value.endIndex + 1, numberOfPage.value - 1)
  );
});
</script>

<template>
  <div class="flex justify-center items-center gap-5 col-span-3">
    <button @click="nextPage">
      <img
        src="../../assets/images/body/products/arrow-left.png"
        alt="left arrow"
      />
    </button>
    <div class="flex gap-3 border border-myGray-4 rounded-lg p-3" dir="rtl">
      <button
        @click="changePage(pages[0])"
        class="border border-myGray-8 w-8 h-8 rounded-xl flex justify-center items-center"
        :class="{ 'bg-Tint-5': 1 === pageData.currentPage }"
      >
        <b> 1</b>
      </button>

      <div v-if="pageData.startIndex !== 0 && pages[stepNum - 1] < numberOfPage">
        <b>...</b>
      </div>

      <button
        @click="changePage(page)"
        v-for="(page, index) in slicePages"
        :key="index"
        class="border border-myGray-8 w-8 h-8 rounded-xl flex justify-center items-center"
        :class="{ 'bg-Tint-5': page === pageData.currentPage }"
      >
        <b> {{ page }}</b>
      </button>
      <div
        v-if="
          pages[pageData.endIndex] !== numberOfPage - 1 &&
          numberOfPage > 1 &&
          pages[stepNum - 1] < numberOfPage
        "
      >
        <b>...</b>
      </div>

      <button
        v-if="numberOfPage > 1"
        @click="changePage(numberOfPage)"
        class="border border-myGray-8 w-8 h-8 rounded-xl flex justify-center items-center"
        :class="{ 'bg-Tint-5': numberOfPage === pageData.currentPage }"
      >
        <b> {{ numberOfPage }}</b>
      </button>
    </div>

    <button @click="prevPage">
      <img
        src="../../assets/images/body/products/arrow-right.png"
        alt="right arrow"
      />
    </button>
  </div>
</template>
