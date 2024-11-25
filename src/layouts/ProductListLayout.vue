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
import { useProductListStore } from "../store/useProductListStore";
import { useFindImageUrl } from "../composables/useFindImageUrl";
import { useInitializeStores } from "../composables/useInitializeStores";
import { useHandleStoreUpdate } from "../composables/useHandleStoreUpdate";

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

watch(pageData.value, () => {

  handleStoreUpdate();
});

onBeforeMount(() => {
  initializeStores();
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
