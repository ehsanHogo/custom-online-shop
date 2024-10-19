<script setup lang="ts">
import { computed, ref, watch } from "vue";

interface MyProps {
  pagesNum: number;
  stepNum: number;
}
const props = defineProps<MyProps>();

const emit = defineEmits(["data-page"]);

const sendDataToParent = (pageData: number) => {
  emit("data-page", pageData);
};
// manual setting
const currentPage = ref(1);
const totalPage = props.pagesNum;
const stepSize = props.stepNum;

// general
const firstPage = ref(1);
const lastPage = ref(Math.min(stepSize, totalPage));
const lastPageIndex = computed(() => lastPage.value - 1);
const firstPageIndex = computed(() => {
  if (firstPage.value === 1) {
    return firstPage.value - 1;
  } else {
    return firstPage.value - 2;
  }
});

const pages = [...Array(totalPage - 2)].map((_, i) => i + 2);

const changePage = (page: number) => {
  if (page === 1) {
    // Reset to the first set of pages
    firstPage.value = 1;
    lastPage.value = Math.min(stepSize, totalPage);
  } else if (page === totalPage) {
    // Show the last set of pages
    firstPage.value = Math.max(1, totalPage - stepSize + 1);
    lastPage.value = totalPage;
  }
  currentPage.value = page;
};

watch(currentPage, (newval, _) => {
  sendDataToParent(newval);
});

const nextPage = () => {
  if (currentPage.value < totalPage) {
    currentPage.value++;
    if (currentPage.value > lastPage.value) {
      firstPage.value += stepSize;
      lastPage.value = Math.min(totalPage, lastPage.value + stepSize);
    }
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    if (currentPage.value < firstPage.value) {
      firstPage.value = Math.max(1, firstPage.value - stepSize);
      lastPage.value = firstPage.value + stepSize - 1;
    }
  }
};

// Slice pages to display in pagination bar
const slicePages = computed(() =>
  pages.slice(firstPageIndex.value, lastPageIndex.value)
);
</script>

<template>
  <div class="flex justify-center items-center gap-5 col-span-3">
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
