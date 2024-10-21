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
  FilterItemType,
  FilterCriteriaType,
} from "../../types/interfaces";
import { useCurrentPageProp } from "vuestic-ui/dist/types/components/va-data-table/hooks/useCommonProps.js";

const filters = ref<FilterType[]>([]);
const loading = ref(true);
const dataFetched = ref<DataFetchType[]>([]);
const ShowData = ref<DataFetchType[]>([]);

const includedFetched = ref<IncludedFetchType[]>([]);

//filter
const haveFilter = ref(false);
const filterCriterias = ref<FilterCriteriaType[]>([]);

const filteredfetchData = ref<DataFetchType[]>([]);

const recieveDataFetched = (filterData: FilterItemType, action: string) => {
  // console.log(filterData);

  if (action === "add") {
    // console.log("here");

    fetchData(sortField.value, filterData);
    //   haveFilter.value = hasFilter;
    // if (hasFilter) {
    //   ShowData.value = data;
    // } else {
    //   ShowData.value = dataFetched.value;
    // }
  } else if (action === "remove") {
    filterCriterias.value = filterCriterias.value.filter((item) => {
      return item.criteriaId !== filterData.criteriaId;
    });

    // console.log(filterCriterias.value);
    filteredfetchData.value = [];
    filterCriterias.value.forEach((item) => {
      filteredfetchData.value = filteredfetchData.value.concat(item.data);
    });

    if (filterCriterias.value.length === 0) {
      ShowData.value = dataFetched.value;
    } else {
      ShowData.value = filteredfetchData.value;
    }
  }
};
//sort

//pagination
const fetchPage = ref(1);

const numberOfPage = ref(5);

const fetchData = async (sort: SortType, filter: FilterItemType) => {
  loading.value = true;

  console.log(filter);

  let query = "";

  if (fetchPage.value === 1) {
    query = "https://demo.spreecommerce.org/api/v2/storefront/products?";
  } else {
    query = `https://demo.spreecommerce.org/api/v2/storefront/products?page=${fetchPage.value}&`;
  }
  if (sort === "none") {
    query += "include=images";
  } else if (sort === "price-cheap") {
    query += "sort=price&include=images";
  } else if (sort === "price-expensive") {
    query += "sort=-price&include=images";
  } else if (sort === "new-created") {
    query += "sort=-created_at&include=images";
  }

  if (filter.filterType !== "none") {
    query += `&filter[options][${filter.filterType}]=${filter.filterCriteria}`;
    console.log(query);
  }
  try {
    const res = await fetch(`${query}`, { method: "GET" });
    const response = await res.json();

    if (!res.ok) {
      throw Error("error in fetch");
    } else {
      if (filter.filterType !== "none") {
        // console.log("HERE1");

        console.log(response.data);

        filters.value = response.meta.filters.option_types;
        filterCriterias.value.push({
          criteriaId: filter.criteriaId,
          data: response.data,
        });

        includedFetched.value = includedFetched.value.concat(response.included);

        filteredfetchData.value = filteredfetchData.value.concat(response.data);

        ShowData.value = filteredfetchData.value;
      } else {
        filters.value = response.meta.filters.option_types;

        includedFetched.value = includedFetched.value.concat(response.included);

        dataFetched.value = dataFetched.value.concat(response.data);

        ShowData.value = ShowData.value.concat(response.data);
      }

      // console.log("meta ", response.meta);
      loading.value = false;
    }
  } catch (e) {
    console.log(e);
  }
};

const currentPage = ref(1); // recieve update from child

const receivePageData = (data: number) => {
  currentPage.value = data;
  if (haveFilter.value) {
  } else {
    if (currentPage.value === numberOfPage.value) {
      if ((fetchPage.value * 25 + 25) % 6 === 0) {
        numberOfPage.value = (fetchPage.value * 25 + 25) / 6;
      } else {
        numberOfPage.value = Math.floor((fetchPage.value * 25 + 25) / 6) + 1;
      }
      fetchPage.value += 1;

      fetchData(sortField.value, {
        filterType: "none",
        filterCriteria: "a",
        criteriaId: "a",
      });
    }
  }
};

const findImageUrl = (imageId: string) => {
  if (imageId === null || imageId === undefined) {
    return "";
  }

  const resultItem = includedFetched.value.filter((item) => {
    return item.id === imageId;
  });

  if (resultItem.length === 0) {
    return "";
  } else {
    return resultItem[0].attributes.original_url;
  }
};

const sortField = ref<SortType>("none");
const receiveSortData = (data: SortType) => {
  sortField.value = data;
};

onBeforeMount(() => {
  fetchData(sortField.value, {
    filterType: "none",
    filterCriteria: "fdfgs",
    criteriaId: "fjksdhg",
  });
});

watch(sortField, (newVal) => {
  fetchData(newVal, {
    filterType: "none",
    filterCriteria: "fdfgs",
    criteriaId: "fjksdhg",
  });
});
</script>

<template>
  <div class="p-5">
    <Cattegories></Cattegories>

    <div class="grid grid-cols-4 p-5 gap-4">
      <div
        class="col-span-3 grid grid-cols-3 gap-3 auto-rows-min justify-start items-start"
      >
        <Sort @data-sort="receiveSortData"></Sort>
        <div v-if="loading" class="grid col-span-3 p-5 h-96">
          <VaInnerLoading loading :size="60" />
        </div>
        <ShowCards
          v-if="!loading"
          v-for="(item, index) in ShowData.slice(
            (currentPage - 1) * 6,
            (currentPage - 1) * 6 + 6
          )"
          :key="index"
          :name="item.attributes.slug"
          :price="item.attributes.display_price"
          :description="item.attributes.description"
          :imageUrl="findImageUrl(item.relationships.images?.data?.[0]?.id)"
        ></ShowCards>

        <Pagination
          :numberOfPages="numberOfPage"
          :stepNum="3"
          :startPage="fetchPage"
          @data-page="receivePageData"
        ></Pagination>
      </div>

      <Filter @data-fetched="recieveDataFetched" :filterData="filters"></Filter>
    </div>
  </div>
</template>

<style scoped></style>
