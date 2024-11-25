<script setup lang="ts">
import Filter from "../components/products/filter/Filter.vue";
import ShowCards from "../components/products/cards/ShowCards.vue";
import { onBeforeMount, watch } from "vue";
import Sort from "../components/products/Sort.vue";
import Pagination from "../components/Common/Pagination.vue";
import CardSkeleton from "../components/products/cards/CardSkeleton.vue";

import useSortStore from "../store/useSortStore";
import { storeToRefs } from "pinia";
import useFilterStore from "../store/useFilterStore";
import usePageStore from "../store/usePageData";
import { useUpdatePath } from "../composables/useUpdatePath";
import { useProductListStore } from "../store/useProductListStore";
import { useFetchData } from "../composables/useFetchData";
import { useFindImageUrl } from "../composables/useFindImageUrl";
import { useInitializeStores } from "../composables/useInitializeStores";

const ProductPath = "/custom-online-shop/";
//store

//sort store
const sortStore = useSortStore();
const { sortField } = storeToRefs(sortStore);
//filter store
const filterStore = useFilterStore();
const { allFilter } = storeToRefs(filterStore);
//page store
const pageStore = usePageStore();
const { pageData } = storeToRefs(pageStore);
// product list store
const productListStore = useProductListStore();
///******* */
// composables
const { updatePath } = useUpdatePath();
const { fetchData } = useFetchData();
const { findImageUrl } = useFindImageUrl();
const { initializeStores } = useInitializeStores();
// subscribe & watch

filterStore.$subscribe((mutation, _) => {
  console.log("mutation ", mutation);
  const events = Array.isArray(mutation.events)
    ? mutation.events
    : [mutation.events];
  events.forEach((item) => {
    if (item.key !== "filtersType") {
      updatePath(ProductPath, {
        sortField: sortField.value,
        filters: allFilter.value.filters,
        onlyExist: allFilter.value.onlyExist,
        currentPage: pageData.value.currentPage,
        startIndex: pageData.value.startIndex,
        endIndex: pageData.value.endIndex,
      });
      fetchData({
        allFilter: allFilter.value,
        sortField: sortField.value,
        pageData: pageData.value,
      });
    }
  });
});

sortStore.$subscribe((_) => {
  updatePath(ProductPath, {
    sortField: sortField.value,
    filters: allFilter.value.filters,
    onlyExist: allFilter.value.onlyExist,
    currentPage: pageData.value.currentPage,
    startIndex: pageData.value.startIndex,
    endIndex: pageData.value.endIndex,
  });
  fetchData({
    allFilter: allFilter.value,
    sortField: sortField.value,
    pageData: pageData.value,
  });
});

watch(pageData.value, () => {
  // console.log(val);
  updatePath(ProductPath, {
    sortField: sortField.value,
    filters: allFilter.value.filters,
    onlyExist: allFilter.value.onlyExist,
    currentPage: pageData.value.currentPage,
    startIndex: pageData.value.startIndex,
    endIndex: pageData.value.endIndex,
  });
  fetchData({
    allFilter: allFilter.value,
    sortField: sortField.value,
    pageData: pageData.value,
  });
});

onBeforeMount(() => {
  initializeStores();

  fetchData({
    allFilter: allFilter.value,
    sortField: sortField.value,
    pageData: pageData.value,
  });
});
</script>

<template>
  <div class="p-5">
    <div class="grid grid-cols-4 p-5 gap-4">
      <div
        class="col-span-3 grid grid-cols-3 gap-3 auto-rows-min justify-start items-start"
      >
        <Sort></Sort>

        <div
          v-if="productListStore.loading"
          class="col-span-3 grid grid-cols-3 gap-3"
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
