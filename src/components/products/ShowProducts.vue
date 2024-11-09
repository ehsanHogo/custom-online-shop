<script setup lang="ts">
import Filter from "./filter/Filter.vue";
import ShowCards from "./cards/ShowCards.vue";
import { onBeforeMount, ref, toRef, watch } from "vue";
import Sort from "./Sort.vue";
import Pagination from "../generall/Pagination.vue";
import CardSkeleton from "./cards/CardSkeleton.vue";

import qs from "qs";
import {
  FilterType,
  DataFetchType,
  IncludedFetchType,
  SortType,
  QueryType,
  FiltersQueryType,
  ShoppingProductType,
  ShoppingCartListType,
  PageType,
} from "../../types/interfaces";
import { useRoute, useRouter } from "vue-router";
import useSortStore from "../../store/useSortStore";
import { storeToRefs } from "pinia";
import useFilterStore from "../../store/useFilterStore";
import usePageStore from "../../store/usePageData";
interface MyProps {
  shoppingList: ShoppingCartListType;
}

//store

const sortStore = useSortStore();
const { sortField } = storeToRefs(sortStore);

const filterStore = useFilterStore();
const { filters, onlyExist } = storeToRefs(filterStore);

const pageStore = usePageStore();

const { currentPage, startIndex, endIndex } = storeToRefs(pageStore);

watch(currentPage, (val) => {
  console.log(val);
  updatePath();
  fetchData();
});

///******* */

// subscribe

filterStore.$subscribe((mutation, state) => {
  // shoeld update
  console.log("mutation ", mutation);

  updatePath();
  fetchData();
});

sortStore.$subscribe((_, state) => {
  updatePath();
  fetchData();
});

//**** */

const props = defineProps<MyProps>();
//shopping
const fatherShoppingList = toRef(props, "shoppingList");

const childShoppingList = ref<ShoppingCartListType>(fatherShoppingList.value);

const firstRefresh = ref(props.shoppingList.firstRefresh);

const router = useRouter();

const route = useRoute();

const loading = ref(true);

const showData = ref<DataFetchType[]>([]);

const includedFetched = ref<IncludedFetchType[]>([]);

//filter
const filtersType = ref<FilterType[]>([]);

// const filterCriterias = ref<FiltersQueryType>({
//   filters: [],
//   onlyExist: false,
//   sortField: "none",
// });

//page

const lastPage = ref(1);

const numberOfPage = ref(1);
const numberOfProductsInPage = 9;

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
    cart: qs.stringify(childShoppingList.value as ShoppingCartListType, {
      allowEmptyArrays: true,
    }),
  };

  router.push({
    path: "/custom-online-shop/",
    query: obj,
  });
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

onBeforeMount(() => {
  const fillterSortObj = qs.parse(qs.parse(route.query)["fillterSort"]);
  const cartObj = qs.parse(qs.parse(route.query)["cart"]);
  const pageObj = qs.parse(qs.parse(route.query)["page"]);

  console.log("refresh : ", firstRefresh.value);
  if (
    fillterSortObj !== null &&
    fillterSortObj !== undefined &&
    Object.keys(fillterSortObj).length !== 0
  ) {
    if (fillterSortObj.filters[0] === "") fillterSortObj.filters = [];
    if (fillterSortObj.onlyExist === "false") fillterSortObj.onlyExist = false;
    else fillterSortObj.onlyExist = true;

    // filterCriterias.value = fillterSortObj as FiltersQueryType;
    filters.value = (fillterSortObj as FiltersQueryType).filters;
    onlyExist.value = (fillterSortObj as FiltersQueryType).onlyExist;
    sortField.value = (fillterSortObj as FiltersQueryType).sortField;

    currentPage.value = +pageObj.currentPage;
    startIndex.value = +pageObj.startIndex;
    endIndex.value = +pageObj.endIndex;
    // pageData = {
    //   currentPage: +pageObj.page,
    //   startIndex: +pageObj.startIndex,
    //   endIndex: +pageObj.endIndex,
    // };

    console.log("father page ", currentPage.value);

    if (firstRefresh.value) {
      console.log(cartObj.products);
      if (cartObj.products[0] === "") {
        childShoppingList.value.products = [];
      } else {
        childShoppingList.value.products = (
          cartObj as ShoppingCartListType
        ).products.map((item) => {
          return { ...item, count: +item.count };
        });
      }

      // emit("shopping-data", childShoppingList.value);
      firstRefresh.value = false;
    } else {
      childShoppingList.value = fatherShoppingList.value;
      updatePath();
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
          :count="
            childShoppingList.products.find((elem) => elem.id === item.id)
              ?.count || 0
          "
        ></ShowCards>

        <Pagination
          :numberOfPages="numberOfPage"
          :stepNum="3"
          :lastPage="lastPage"
        ></Pagination>
      </div>

      <Filter :filterData="filtersType"></Filter>
    </div>
  </div>
</template>

<style scoped></style>
