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
    <div class="grid grid-cols-2 md:grid-cols-4 p-5 gap-4">
      <div
        class="col-span-2 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-3 auto-rows-min justify-center md:justify-start items-center md:items-start"
      >
        <Sort></Sort>

        <div
          v-if="productListStore.loading"
          class="col-span-2 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-3"
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
