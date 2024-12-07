<script setup lang="ts">
import ShowCards from "../components/products/cards/ShowCards.vue";
import { onBeforeMount, onMounted, onUnmounted, ref, watch } from "vue";
import Pagination from "../components/Common/Pagination.vue";
import CardSkeleton from "../components/products/cards/CardSkeleton.vue";

import useSortStore from "../store/useSortStore";
import useFilterStore from "../store/useFilterStore";
import usePageStore from "../store/usePageData";
import { useProductListStore } from "../store/useProductListStore";
import { useFindImageUrl } from "../composables/useFindImageUrl";
import { useInitializeStores } from "../composables/useInitializeStores";
import { useHandleStoreUpdate } from "../composables/useHandleStoreUpdate";

import CattegorieseDesktop from "../components/products/cattegories/CattegorieseDesktop.vue";
import CattegoriesMobile from "../components/products/cattegories/CattegoriesMobile.vue";
import SortDesktop from "../components/products/sort/SortDesktop.vue";
import SortMobile from "../components/products/sort/SortMobile.vue";
// import { useModalStore } from "../store/useModalsStore";
import FilterDesktop from "../components/products/filter/desktop/FilterDesktop.vue";
import FiltterMobile from "../components/products/filter/mobile/FiltterMobile.vue";
import useScreenStore from "../store/useScreenStore";
//store

//sort store
const sortStore = useSortStore();

//filter store
const filterStore = useFilterStore();

//page store
const pageStore = usePageStore();

const productListStore = useProductListStore();
///******* */
// composables

const { findImageUrl } = useFindImageUrl();
const { initializeStores } = useInitializeStores();
const { handleStoreUpdate } = useHandleStoreUpdate();
// subscribe & watch

watch(
  () => filterStore.allFilter,
  () => {
    handleStoreUpdate();
  },
  { deep: true }
);

sortStore.$subscribe((_) => {
  handleStoreUpdate();
});

pageStore.$subscribe((_) => {
  handleStoreUpdate();
});

const screenStore = useScreenStore();

onBeforeMount(() => {
  initializeStores();
});
</script>

<template>
  <div class="md:p-3 flex flex-col items-center">
    <CattegorieseDesktop
      v-if="screenStore.isDesktop"
      class="pt-5"
    ></CattegorieseDesktop>

    <div
      class="flex flex-col xsm:grid xsm:grid-cols-2 md:grid-cols-4 py-5 px-8 gap-4 w-full"
    >
      <div
        class="flex flex-col justify-center gap-2 w-full xsm:col-span-2 xsm:grid-cols-2 xsm:gap-5 xsm:auto-rows-min xsm:justify-center xsm:grid md:col-span-3 md:grid-cols-3 md:gap-3 md:justify-start items-center md:items-start"
      >
        <SortDesktop v-if="screenStore.isDesktop"></SortDesktop>

        <div class="flex gap-4 col-span-2 max-xsm:mb-3" dir="rtl" v-else>
          <FiltterMobile :filterData="filterStore.filtersType"></FiltterMobile>

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

      <FilterDesktop
        v-if="screenStore.isDesktop"
        :filterData="filterStore.filtersType"
      ></FilterDesktop>
    </div>
  </div>
</template>

<style scoped></style>
