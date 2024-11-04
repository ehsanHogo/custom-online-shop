<script setup lang="ts">
import { computed, ref, toRef, watch } from "vue";
import { PageType } from "../../types/interfaces";

interface MyProps {
  numberOfPages: number;
  stepNum: number;
  startPage: number;
  prevPages: PageType;
}
const props = defineProps<MyProps>();

const emit = defineEmits(["data-page"]);

const sendDataToParent = (pageData: PageType) => {
  emit("data-page", pageData);
};
// manual setting

const fatherPageData = toRef(props, "prevPages");
const currentPage = ref(fatherPageData.value.page);

console.log("father page :", fatherPageData.value);
console.log("father page :", currentPage.value);

const totalPage = toRef(props, "numberOfPages");
// const totalPage = ref(5);
const stepSize = props.stepNum;

const firstPageIndex = ref(fatherPageData.value.startIndex);
const lastPageIndex = ref(fatherPageData.value.endIndex);

watch(fatherPageData, (newVal) => {
  if (newVal.page === 1) {
    currentPage.value = 1;
    firstPageIndex.value = 0;
    lastPageIndex.value = stepSize - 1;
  } else {
    // calculatePageIndices(newVal.page);
  }

  // console.log("heasdgaghshfre");
  // console.log(currentPage.value);
});

const calculatePageIndices = (page: number) => {
  // const startIndex = Math.max(0, page - Math.ceil(stepSize / 2));
  // let startIndex = 0;
  // if (page % stepSize === 0) {
  //   lastPageIndex.value = page - 1;
  //   firstPageIndex.value = lastPageIndex.value - stepSize + 1;
  // } else {
  //   lastPageIndex.value = page + (page % stepSize) - 1;
  //   firstPageIndex.value = lastPageIndex.value - stepSize + 1;
  // }

  // // startIndex = (page % stepSize) - 2 + page / stepSize - 1;
  // firstPageIndex.value = startIndex;
  // lastPageIndex.value = Math.min(
  //   startIndex + stepSize - 1,
  //   totalPage.value - 1
  // );

  console.log(firstPageIndex.value);
  console.log(lastPageIndex.value);
};
// general

const pages = computed(() => {
  // console.log([...Array(totalPage.value)].map((_, i) => i + 1));
  return [...Array(totalPage.value)].map((_, i) => i + 1);
});

const changePage = (page: number) => {
  if (page === 1) {
    // Reset to the first set of pages
    firstPageIndex.value = 0;
    lastPageIndex.value = Math.min(stepSize - 1, totalPage.value);
  } else if (page === totalPage.value) {
    // Show the last set of pages
    firstPageIndex.value = Math.max(0, totalPage.value - stepSize - 1);
    lastPageIndex.value = totalPage.value - 2;
  }
  currentPage.value = page;
};

watch(currentPage, (newval, _) => {
  sendDataToParent({
    page: newval,
    startIndex: firstPageIndex.value,
    endIndex: lastPageIndex.value,
  });
});

const nextPage = () => {
  if (currentPage.value < totalPage.value) {
    if (currentPage.value + 1 > pages.value[lastPageIndex.value]) {
      firstPageIndex.value += stepSize;
      lastPageIndex.value = Math.min(
        totalPage.value - 1,
        lastPageIndex.value + stepSize
      );
    }

    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    if (currentPage.value - 1 < pages.value[firstPageIndex.value]) {
      lastPageIndex.value = firstPageIndex.value - 1;
      firstPageIndex.value = Math.max(0, firstPageIndex.value - stepSize);
    }

    currentPage.value--;
  }
};

// Slice pages to display in pagination bar
const slicePages = computed<number[]>(() => {
  return pages.value.slice(
    Math.max(1, firstPageIndex.value),
    Math.min(lastPageIndex.value + 1, totalPage.value - 1)
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

      <div v-if="firstPageIndex !== 0 && pages[stepNum - 1] < totalPage">
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
          pages[lastPageIndex] !== totalPage - 1 &&
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
