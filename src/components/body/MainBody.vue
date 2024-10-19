<script setup lang="ts">
import Filter from "./Filter.vue";
import ShowCards from "./ShowCards.vue";
import { computed, onBeforeMount, ref, watch } from "vue";
import Sort from "./Sort.vue";
import Pagination from "./Pagination.vue";

import Cattegories from "./Cattegories.vue";
import {
  FilterType,
  DataFetchType,
  IncludedFetchType,
  SortType,
} from "../../types/interfaces";

const filters = ref<FilterType[]>([]);
const loading = ref(true);
const dataFetched = ref<DataFetchType[]>([]);
const includedFetched = ref<IncludedFetchType[]>([]);
const holeQuery = ref(
  "https://demo.spreecommerce.org/api/v2/storefront/products?include=images"
);

const fetchData = async (sort: SortType) => {
  let query = "";
  if (sort === "none") {
    query =
      "https://demo.spreecommerce.org/api/v2/storefront/products?include=images";
  } else if (sort === "price-cheap") {
    query =
      "https://demo.spreecommerce.org/api/v2/storefront/products?sort=price&include=images";
  } else if (sort === "price-expensive") {
    query =
      "https://demo.spreecommerce.org/api/v2/storefront/products?sort=-price&include=images";
  } else if (sort === "new-created") {
    query =
      "https://demo.spreecommerce.org/api/v2/storefront/products?sort=-created_at&include=images";
  }

  console.log(query);

  try {
    const res = await fetch(`${query}`, { method: "GET" });

    if (!res.ok) {
      throw Error("error in fetch");
    } else {
      const response = await res.json();
      console.log(response.meta.filters.option_types);

      filters.value = response.meta.filters.option_types;
      // console.log(response);
      includedFetched.value = response.included;

      dataFetched.value = response.data;
      // console.log(dataFetched.value);

      loading.value = false;
    }
  } catch (e) {
    console.log(e);
  }
};

const currentPage = ref(1); // recieve update from child

const receivePageData = (data: number) => {
  currentPage.value = data;
};

const findImageUrl = (imageId: string) => {
  if (imageId === null || imageId === undefined) {
    return "";
  }
  // console.log("sdfjksj : ", includedFetched);
  const resultItem = includedFetched.value.filter((item) => {
    return item.id === imageId;
  });
  if (resultItem !== null || resultItem !== undefined) {
    return resultItem[0].attributes.original_url;
  } else {
    return "";
  }
};

const sortField = ref<SortType>("none");
const receiveSortData = (data: SortType) => {
  sortField.value = data;
};

onBeforeMount(() => {
  fetchData(sortField.value);
});

watch(sortField, (newVal) => {
  fetchData(newVal);
});
</script>

<template>
  <div class="p-5">
    <Cattegories></Cattegories>

    <div class="grid grid-cols-4 p-5 gap-4">
      <div v-if="loading" class="grid col-span-3 p-5">
        <VaInnerLoading loading :size="60" />
      </div>

      <div
        class="col-span-3 grid grid-cols-3 gap-3 auto-rows-min justify-start items-start"
        v-if="!loading"
      >
        <Sort @data-sort="receiveSortData"></Sort>
        <ShowCards
          v-for="(item, index) in dataFetched.slice(
            (currentPage - 1) * 6,
            (currentPage - 1) * 6 + 6
          )"
          :key="index"
          :name="item.attributes.slug"
          :price="item.attributes.display_price"
          :description="item.attributes.description"
          :imageUrl="findImageUrl(item.relationships.images?.data?.[0]?.id)"
        ></ShowCards>
      </div>

      <Filter :filterData="filters"></Filter>
    </div>

    <Pagination
      :pagesNum="5"
      :stepNum="2"
      @data-page="receivePageData"
    ></Pagination>
  </div>
</template>

<style scoped></style>
