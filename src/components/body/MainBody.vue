<script setup lang="ts">
import Filter from "./Filter.vue";
import ShowCards from "./ShowCards.vue";
import { computed, onBeforeMount, ref, watch } from "vue";
import Sort from "./Sort.vue";
import Pagination from "./Pagination.vue";
import CardSkeleton from "./CardSkeleton.vue";
import Cattegories from "./Cattegories.vue";
import {
  FilterType,
  DataFetchType,
  IncludedFetchType,
  SortType,
  FilterItemType,
  QueryType,
  FiltersQueryType,
} from "../../types/interfaces";

const loading = ref(true);

const showData = ref<DataFetchType[]>([]);

const includedFetched = ref<IncludedFetchType[]>([]);

//filter
const filters = ref<FilterType[]>([]);

const filterCriterias = ref<FiltersQueryType>({
  filters: [],
  onlyExist: false,
});

const recieveDataFetched = (filterData: FiltersQueryType) => {
  // if (action === "add") {
  //   filterCriterias.value.push(filterData);
  // } else if (action === "remove") {
  //   filterCriterias.value = filterCriterias.value.filter((item) => {
  //     return item.criteriaId !== filterData.criteriaId;
  //   });
  // }

  console.log(filterData.onlyExist);

  filterCriterias.value = filterData;
  fetchData(sortField.value, filterData, currentPage.value);
};

//page

const fetchPage = ref(1);

const lastPage = ref(1);

const numberOfPage = ref(1);
const numberOfProductsInPage = 9;

const fetchData = async (
  sort: SortType,
  filter: FiltersQueryType,
  nextPage: number
) => {
  loading.value = true;

  // console.log(nextPage);

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

  if (nextPage !== 1) {
    baseQuery += `&page=${nextPage}`;
  }

  if (sort === "none") {
    // baseQuery += mainQuery.splitQuery +  mainQuery.include.images;
  } else if (sort === "price-cheap") {
    baseQuery += mainQuery.splitQuery + mainQuery.sort.priceAsc;
  } else if (sort === "price-expensive") {
    baseQuery += mainQuery.splitQuery + mainQuery.sort.priceDec;
  } else if (sort === "new-created") {
    baseQuery += mainQuery.splitQuery + mainQuery.sort.createdAsc;
  }

  if (filter.filters.length !== 0) {
    filter.filters.forEach((item) => {
      baseQuery += `&filter[options][${item.filterType}]=${item.filterCriteria}`;
    });
  }
  if (filter.onlyExist) {
    baseQuery += `&filter[in_stock]=true`;
  }

  try {
    const res = await fetch(`${baseQuery}`, { method: "GET" });
    const response = await res.json();

    if (!res.ok) {
      throw Error("error in fetch");
    } else {
      console.log(response.data);
      filters.value = response.meta.filters.option_types;

      includedFetched.value = response.included;
      showData.value = response.data;

      if (response.meta.total_pages !== numberOfPage.value) {
        currentPage.value = 1;
      }

      numberOfPage.value = response.meta.total_pages;

      loading.value = false;
    }
  } catch (e) {
    console.log(e);
  }
};

const currentPage = ref(1); // recieve update from child

const receivePageData = (data: number) => {
  currentPage.value = data;

  fetchPage.value += 1;

  fetchData(sortField.value, filterCriterias.value, currentPage.value);
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
  fetchData(sortField.value, filterCriterias.value, 1);
});

watch(sortField, (newVal) => {
  fetchData(newVal, filterCriterias.value, currentPage.value);
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
        <!-- <div v-if="loading" class="grid col-span-3 p-5 h-96"> -->
        <!-- <VaInnerLoading loading :size="60" /> -->

        <!-- <div
            class="max-w-[250px] border drop-shadow-md rounded-md p-3 flex flex-col gap-3 h-[400px]"
          > -->

        <!-- </div> -->
        <!-- <VaSkeleton variant="text" :lines="2" />  -->
        <!-- </div> -->
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
        ></ShowCards>

        <Pagination
          :numberOfPages="numberOfPage"
          :stepNum="3"
          :startPage="currentPage"
          :lastPage="lastPage"
          @data-page="receivePageData"
        ></Pagination>
      </div>

      <Filter @data-fetched="recieveDataFetched" :filterData="filters"></Filter>
    </div>
  </div>
</template>

<style scoped></style>
