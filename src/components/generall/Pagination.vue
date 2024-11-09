<script setup lang="ts">
import { computed, Ref, ref, toRef, watch } from "vue";
import { PageType } from "../../types/interfaces";
import usePageStore from "../../store/usePageData";
import { storeToRefs } from "pinia";

interface MyProps {
  numberOfPages: number;
  stepNum: number;

}

//store

const pageStore = usePageStore();

//***** */
const props = defineProps<MyProps>();

const emit = defineEmits(["data-page"]);


// manual setting
const totalPage = toRef(props, "numberOfPages");

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
    startIndex.value = 0;
    endIndex.value = Math.min(stepSize - 1, totalPage.value);
  } else if (page === totalPage.value) {
    // Show the last set of pages
    startIndex.value = Math.max(0, totalPage.value - stepSize - 1);
    endIndex.value = totalPage.value - 2;
  }
  currentPage.value = page;
};


const nextPage = () => {
  if (currentPage.value < totalPage.value) {
    if (currentPage.value + 1 > pages.value[endIndex.value]) {
      startIndex.value += stepSize;
      endIndex.value = Math.min(totalPage.value - 1, endIndex.value + stepSize);
    }

    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    if (currentPage.value - 1 < pages.value[startIndex.value]) {
      endIndex.value = startIndex.value - 1;
      startIndex.value = Math.max(0, startIndex.value - stepSize);
    }

    currentPage.value--;
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
