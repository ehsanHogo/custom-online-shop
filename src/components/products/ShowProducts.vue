<script setup lang="ts">
import Filter from "./filter/Filter.vue";
import ShowCards from "./cards/ShowCards.vue";
import { onBeforeMount, ref, watch } from "vue";
import Sort from "./Sort.vue";
import Pagination from "../generall/Pagination.vue";
import CardSkeleton from "./cards/CardSkeleton.vue";

import qs from "qs";
import {
  FilterType,
  DataFetchType,
  IncludedFetchType,
  QueryType,
  FiltersQueryType,
  PageType,
  SortType,
} from "../../types/interfaces";
import { useRoute, useRouter } from "vue-router";
import useSortStore from "../../store/useSortStore";
import { storeToRefs } from "pinia";
import useFilterStore from "../../store/useFilterStore";
import usePageStore from "../../store/usePageData";

//store

//sort store
const sortStore = useSortStore();
const { sortField } = storeToRefs(sortStore);
//filter store
const filterStore = useFilterStore();
const { filters, onlyExist } = storeToRefs(filterStore);
//page store
const pageStore = usePageStore();
const { currentPage, startIndex, endIndex } = storeToRefs(pageStore);

///******* */

// subscribe & watch

filterStore.$subscribe((mutation, _) => {
  console.log("mutation ", mutation);
  updatePath();
  fetchData();
});

sortStore.$subscribe((_) => {
  updatePath();
  fetchData();
});

watch(currentPage, () => {
  // console.log(val);
  updatePath();
  fetchData();
});

//**** */

// composable

// const { updateAllPageData, resetPageData } = useUpdateAllPageData();
//router
const router = useRouter();
const route = useRoute();

const updatePath = () => {
  const obj = {
    fillterSort: qs.stringify(
      {
        filters: filters.value,
        onlyExist: onlyExist.value,
        sortField: sortField.value,
      } as FiltersQueryType,
      {
        allowEmptyArrays: true,
      }
    ),
    page: qs.stringify({
      currentPage: currentPage.value,
      startIndex: startIndex.value,
      endIndex: endIndex.value,
    } as PageType),
  };

  router.push({
    path: "/custom-online-shop/",
    query: obj,
  });
};

//data showing
const stepNum = 3;
const loading = ref(true);

const showData = ref<DataFetchType[]>([]);

const includedFetched = ref<IncludedFetchType[]>([]);

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

//filter types
const filtersType = ref<FilterType[]>([]);

//page props

const numberOfPage = ref(1);
const numberOfProductsInPage = 9;

// fetching data based on filter, sort and page
const fetchData = async () => {
  loading.value = true;

  let baseQuery = `https://demo.spreecommerce.org/api/v2/storefront/products?per_page=${numberOfProductsInPage}&include=images`;
  const mainQuery: QueryType = {
    include: {
      images: "include=images",
    },
    sort: {
      priceAsc: "sort=price",
      priceDec: "sort=-price",
      createdAsc: "sort=-created_at",
    },
    splitQuery: "&",
  };

  if (currentPage.value !== 1) {
    baseQuery += `&page=${currentPage.value}`;
  }

  if (sortField.value === "none") {
  } else if (sortField.value === "price-cheap") {
    baseQuery += mainQuery.splitQuery + mainQuery.sort.priceAsc;
  } else if (sortField.value === "price-expensive") {
    baseQuery += mainQuery.splitQuery + mainQuery.sort.priceDec;
  } else if (sortField.value === "new-created") {
    baseQuery += mainQuery.splitQuery + mainQuery.sort.createdAsc;
  }

  if (filters.value.length !== 0) {
    filters.value.forEach((item) => {
      baseQuery += `&filter[options][${item.filterType}]=${item.filterCriteria}`;
    });
  }

  if (onlyExist.value) {
    baseQuery += `&filter[in_stock]=true`;
  }

  try {
    const res = await fetch(`${baseQuery}`, { method: "GET" });
    const response = await res.json();

    if (!res.ok) {
      throw Error("error in fetch");
    } else {
      filtersType.value = response.meta.filters.option_types;
      includedFetched.value = response.included;
      showData.value = response.data;

      numberOfPage.value = response.meta.total_pages;

      loading.value = false;
    }
  } catch (e) {
    console.log(e);
  }
};

// initialization

onBeforeMount(() => {
  const fillterSortParam = qs.parse(route.query as unknown as string)[
    "fillterSort"
  ];
  const fillterSortObj =
    fillterSortParam && typeof fillterSortParam === "string"
      ? (qs.parse(fillterSortParam) as unknown as FiltersQueryType)
      : ({} as unknown as FiltersQueryType);

  const pageObjParam = qs.parse(route.query as unknown as string)["page"];

  const pageObj =
    pageObjParam && typeof pageObjParam === "string"
      ? qs.parse(pageObjParam)
      : {};

  if (
    fillterSortObj !== null &&
    fillterSortObj !== undefined &&
    Object.keys(fillterSortObj).length !== 0
  ) {
    if (
      fillterSortObj.filters &&
      Array.isArray(fillterSortObj.filters) &&
      (fillterSortObj.filters[0] as unknown) === ""
    )
      fillterSortObj.filters = [];
    if ((fillterSortObj.onlyExist as unknown) === "false")
      fillterSortObj.onlyExist = false;
    else fillterSortObj.onlyExist = true;

    filters.value = (fillterSortObj as FiltersQueryType).filters;
    onlyExist.value = (fillterSortObj as FiltersQueryType).onlyExist;
    sortStore.updateSortField(
      (fillterSortObj as FiltersQueryType).sortField as SortType
    );

    if (pageObj.currentPage && pageObj.startIndex && pageObj.endIndex) {
      pageStore.updateAllPageData(
        +pageObj.currentPage,
        +pageObj.startIndex,
        +pageObj.endIndex
      );
    } else {
      pageStore.resetPageData();
    }
  }
  fetchData();
});
</script>

<template>
  <div class="p-5">
    <div class="grid grid-cols-4 p-5 gap-4">
      <div
        class="col-span-3 grid grid-cols-3 gap-3 auto-rows-min justify-start items-start"
      >
        <Sort></Sort>

        <div v-if="loading" class="col-span-3 grid grid-cols-3 gap-3">
          <CardSkeleton v-for="item in new Array(9)" :key="item"></CardSkeleton>
        </div>
        <ShowCards
          v-if="!loading"
          v-for="(item, index) in showData"
          :key="index"
          :name="item.attributes.slug"
          :price="item.attributes.display_price"
          :description="item.attributes.description"
          :imageUrl="findImageUrl(item.relationships.images?.data?.[0]?.id)"
          :id="item.id"
        ></ShowCards>

        <Pagination
          :numberOfPages="numberOfPage"
          :stepNum="stepNum"
        ></Pagination>
      </div>

      <Filter :filterData="filtersType"></Filter>
    </div>
  </div>
</template>

<style scoped></style>
