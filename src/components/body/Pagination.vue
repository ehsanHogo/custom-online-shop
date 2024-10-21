<script setup lang="ts">
import { computed, ref, toRef, watch } from "vue";

interface MyProps {
  numberOfPages: number;
  stepNum: number;
  startPage: number;
}
const props = defineProps<MyProps>();

const emit = defineEmits(["data-page"]);

const sendDataToParent = (pageData: number) => {
  emit("data-page", pageData);
};
// manual setting
const currentPage = ref(1);
const totalPage = toRef(props, "numberOfPages");
// const totalPage = ref(5);
const stepSize = props.stepNum;

// general
// const firstPage = ref(1);
// const lastPage = ref(Math.min(stepSize, totalPage.value));
// const lastPage = ref(2);

const lastPageIndex = ref(stepSize + (props.startPage - 1) * 5);
const firstPageIndex = ref(Math.max(0, currentPage.value - 1));

watch(
  () => props.startPage,
  () => {
    firstPageIndex.value = Math.max(0, currentPage.value - 1);
    lastPageIndex.value = stepSize + currentPage.value - 1;
  }
);
const pages = computed(() => {
  console.log([...Array(totalPage.value)].map((_, i) => i + 1));
  return [...Array(totalPage.value)].map((_, i) => i + 1);
});
//  pages = ref([...Array(totalPage.value)].map((_, i) => i + 1));
// pages = computed(() => [...Array(totalPage.value)].map((_, i) => i + 1));
// console.log(pages.value);

const changePage = (page: number) => {
  if (page === 1) {
    // Reset to the first set of pages
    firstPageIndex.value = 0;
    lastPageIndex.value = Math.min(stepSize + 1, totalPage.value);
  } else if (page === totalPage.value) {
    // Show the last set of pages
    firstPageIndex.value = Math.max(1, totalPage.value - stepSize - 1);
    lastPageIndex.value = totalPage.value - 1;
  }
  currentPage.value = page;
};

watch(currentPage, (newval, _) => {
  sendDataToParent(newval);
});

const nextPage = () => {
  if (currentPage.value < totalPage.value) {
    currentPage.value++;
    if (currentPage.value >= pages.value[lastPageIndex.value]) {
      firstPageIndex.value += stepSize;
      lastPageIndex.value = Math.min(
        totalPage.value - 1,
        lastPageIndex.value + stepSize
      );
    }
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    if (currentPage.value < pages.value[firstPageIndex.value]) {
      firstPageIndex.value = Math.max(0, firstPageIndex.value - stepSize);
      lastPageIndex.value = firstPageIndex.value + stepSize;
    }
  }
};

// Slice pages to display in pagination bar
const slicePages = computed(() => {
  // console.log(firstPageIndex.value);

  // console.log(lastPageIndex.value);
  // console.log(currentPage.value);
  return pages.value.slice(firstPageIndex.value, lastPageIndex.value);
  // if (firstPageIndex.value === 0) {
  //   return pages.value.slice(1, lastPageIndex.value - 1);
  // } else {
  //   return pages.value.slice(firstPageIndex.value, lastPageIndex.value);
  // }
});
</script>

<template>
  <div class="flex justify-center items-center gap-5 col-span-3">
    <button @click="nextPage">
      <img src="../../assets/body/arrow-left.png" alt="left arrow" />
    </button>
    <div class="flex gap-3 border border-myGray-4 rounded-lg p-3" dir="rtl">
      <!-- <button
        @click="changePage(pages[0])"
        class="border border-myGray-8 w-8 h-8 rounded-xl flex justify-center items-center"
        :class="{ 'bg-Tint-5': 1 === currentPage }"
      >
        <b> 1</b>
      </button> -->

      <!-- <div v-if="currentPage !== 1"><b>...</b></div> -->

      <button
        @click="changePage(page)"
        v-for="(page, index) in slicePages"
        :key="index"
        class="border border-myGray-8 w-8 h-8 rounded-xl flex justify-center items-center"
        :class="{ 'bg-Tint-5': page === currentPage }"
      >
        <b> {{ page }}</b>
      </button>
      <div v-if="pages[lastPageIndex] !== totalPage"><b>...</b></div>

      <button
        v-if="currentPage !== totalPage"
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
