<script setup lang="ts">
import Filter from "../components/products/filter/desktop/Filter.vue";
import ShowCards from "../components/products/cards/ShowCards.vue";
import { onBeforeMount, onMounted, onUnmounted, ref, watch } from "vue";
import Sort from "../components/products/Sort.vue";
import Pagination from "../components/Common/Pagination.vue";
import CardSkeleton from "../components/products/cards/CardSkeleton.vue";

import useSortStore from "../store/useSortStore";
import { storeToRefs } from "pinia";
import useFilterStore from "../store/useFilterStore";
import usePageStore from "../store/usePageData";
import { useProductListStore } from "../store/useProductListStore";
import { useFindImageUrl } from "../composables/useFindImageUrl";
import { useInitializeStores } from "../composables/useInitializeStores";
import { useHandleStoreUpdate } from "../composables/useHandleStoreUpdate";
// import CattegorieseDesktop from "../components/products/cattegories/CattegorieseDesktop.vue";
import Cattegories from "../components/products/cattegories/Cattegories.vue";
import CattegorieseDesktop from "../components/products/cattegories/CattegorieseDesktop.vue";
import CattegoriesMobile from "../components/products/cattegories/CattegoriesMobile.vue";
import SortDesktop from "../components/products/sort/SortDesktop.vue";
import SortMobile from "../components/products/sort/SortMobile.vue";
import { useModalStore } from "../store/useModalsStore";
//store

//sort store
const sortStore = useSortStore();

//filter store
const filterStore = useFilterStore();

//page store
const pageStore = usePageStore();
const { pageData } = storeToRefs(pageStore);
// product list store
const productListStore = useProductListStore();
///******* */
// composables

const { findImageUrl } = useFindImageUrl();
const { initializeStores } = useInitializeStores();
const { handleStoreUpdate } = useHandleStoreUpdate();
// subscribe & watch

filterStore.$subscribe((mutation, _) => {
  const isKeyFiltered = Array.isArray(mutation.events)
    ? mutation.events.some((event) => event.key !== "filtersType")
    : mutation.events.key !== "filtersType";

  if (isKeyFiltered) {
    handleStoreUpdate();
  }
});

sortStore.$subscribe((_) => {
  handleStoreUpdate();
});

pageStore.$subscribe((_) => {
  handleStoreUpdate();
});
// watch(pageData.value, () => {
//   handleStoreUpdate();
// });

const isDesktop = ref(window.innerWidth >= 768);

// Function to check the viewport size
const checkViewport = () => {
  if (window.innerWidth >= 768) {
    isDesktop.value = true;

    pageStore.setNumberOfProductsInPage(9);
  } else {
    isDesktop.value = false;

    pageStore.setNumberOfProductsInPage(10);
  }
};

const modalsStore = useModalStore();

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("resize", checkViewport);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkViewport);
});

onBeforeMount(() => {
  initializeStores();
});
</script>

<template>
  <div class="md:p-3 flex flex-col items-center">
    <CattegorieseDesktop v-if="isDesktop" class="pt-5"></CattegorieseDesktop>
    <CattegoriesMobile v-else class="pt-5"></CattegoriesMobile>
    <div
      class="flex flex-col xsm:grid xsm:grid-cols-2 md:grid-cols-4 py-5 px-8 gap-4 w-full"
    >
      <div
        class="flex flex-col justify-center w-full xsm:col-span-2 xsm:grid-cols-2 xsm:gap-5 xsm:auto-rows-min xsm:justify-center xsm:grid md:col-span-3 md:grid-cols-3 md:gap-3 md:justify-start items-center md:items-start"
      >
        <SortDesktop v-if="isDesktop"></SortDesktop>

        <div class="flex gap-4 col-span-2" dir="rtl" v-else>
          <button class="flex gap-1 justify-center items-center">
            <img
              src="../assets/images/body/products/setting.png"
              alt="filter icon"
            />
            <p>فیلتر</p>
          </button>

          <button
            @click="() => modalsStore.toggleSortModal()"
            class="flex gap-1 justify-center items-center"
          >
            <img
              src="../assets/images/body/products/sort.png"
              alt="sort icon"
            />
            <p>{{ modalsStore.selectedSort }}</p>
          </button>
          <SortMobile></SortMobile>
        </div>

        <div
          v-if="productListStore.loading"
          class="xsm:col-span-2 xsm:grid xsm:grid-cols-2 xsm:gap-6 xsm:w-full md:col-span-3 md:grid-cols-3 md:gap-3"
        >
          <CardSkeleton v-for="item in new Array(9)" :key="item"></CardSkeleton>
        </div>

        <ShowCards
          v-if="!productListStore.loading"
          v-for="(item, index) in productListStore.showData"
          :key="index"
          :name="item.attributes.slug"
          :price="item.attributes.display_price"
          :description="item.attributes.description"
          :imageUrl="findImageUrl(item.relationships.images?.data?.[0]?.id)"
          :id="item.id"
        ></ShowCards>

        <Pagination></Pagination>
      </div>

      <Filter :filterData="filterStore.filtersType"></Filter>
    </div>
  </div>
</template>

<style scoped></style>
