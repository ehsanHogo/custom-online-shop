<script setup lang="ts">
import Filter from "./filter/Filter.vue";
import ShowCards from "./cards/ShowCards.vue";
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  toRef,
  watch,
} from "vue";
import Sort from "./Sort.vue";
import Pagination from "../generall/Pagination.vue";
import CardSkeleton from "./cards/CardSkeleton.vue";

import qs from "qs";
interface MyProps {
  shoppingList: ShoppingCartListType;
}

const props = defineProps<MyProps>();
//shopping
const fatherShoppingList = toRef(props, "shoppingList");

const childShoppingList = ref<ShoppingCartListType>(fatherShoppingList.value);

const firstRefresh = ref(props.shoppingList.firstRefresh);

watch(fatherShoppingList.value, (newVal) => {
  childShoppingList.value = newVal;
  updatePath();
  console.log("change list");
});

const updateShoppingList = (data: ShoppingProductType) => {
  console.log("add to shopping list");

  const resultIndex = childShoppingList.value.products.findIndex(
    (item) => item.id === data.id
  );
  if (resultIndex === -1) {
    childShoppingList.value.products =
      childShoppingList.value.products.concat(data);
  } else {
    if (data.count === 0) {
      childShoppingList.value.products.splice(resultIndex, 1);
    } else {
      childShoppingList.value.products[resultIndex].count = data.count;
    }
  }
};

const emit = defineEmits(["shopping-data"]);
const passShoppingData = (data: ShoppingProductType) => {
  updateShoppingList(data);
  // childShoppingList.value.products.
  updatePath();
  emit("shopping-data", childShoppingList.value);
};

const router = useRouter();

const route = useRoute();

import {
  FilterType,
  DataFetchType,
  IncludedFetchType,
  SortType,
  FilterItemType,
  QueryType,
  FiltersQueryType,
  ShoppingProductType,
  ShoppingCartListType,
} from "../../types/interfaces";
import { useRoute, useRouter } from "vue-router";

const loading = ref(true);

const showData = ref<DataFetchType[]>([]);

const includedFetched = ref<IncludedFetchType[]>([]);

//filter
const filtersType = ref<FilterType[]>([]);

const filterCriterias = ref<FiltersQueryType>({
  filters: [],
  onlyExist: false,
  sortField: "none",
});

const recieveDataFetched = (filterData: FiltersQueryType) => {
  // console.log(filterData.onlyExist);

  // const params = { name: "Alice", age: 25 };

  currentPage.value = 1;

  filterCriterias.value.filters = filterData.filters;
  filterCriterias.value.onlyExist = filterData.onlyExist;

  updatePath();
  fetchData(currentPage.value);
};

//page

const fetchPage = ref(1);

const lastPage = ref(1);

const numberOfPage = ref(1);
const numberOfProductsInPage = 9;

const fetchData = async (
  // sort: SortType,
  // filter: FiltersQueryType,
  nextPage: number
) => {
  // console.log("filters", filterCriterias.value);

  loading.value = true;

  console.log("father current", currentPage.value);

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

  if (filterCriterias.value.sortField === "none") {
    // baseQuery += mainQuery.splitQuery +  mainQuery.include.images;
  } else if (filterCriterias.value.sortField === "price-cheap") {
    baseQuery += mainQuery.splitQuery + mainQuery.sort.priceAsc;
  } else if (filterCriterias.value.sortField === "price-expensive") {
    baseQuery += mainQuery.splitQuery + mainQuery.sort.priceDec;
  } else if (filterCriterias.value.sortField === "new-created") {
    baseQuery += mainQuery.splitQuery + mainQuery.sort.createdAsc;
  }

  if (filterCriterias.value.filters.length !== 0) {
    filterCriterias.value.filters.forEach((item) => {
      baseQuery += `&filter[options][${item.filterType}]=${item.filterCriteria}`;
    });
  }
  console.log(filterCriterias.value.onlyExist);

  if (filterCriterias.value.onlyExist) {
    baseQuery += `&filter[in_stock]=true`;
  }

  try {
    const res = await fetch(`${baseQuery}`, { method: "GET" });
    const response = await res.json();

    if (!res.ok) {
      throw Error("error in fetch");
    } else {
      // console.log(response.data);
      filtersType.value = response.meta.filters.option_types;
      console.log("hererer");
      includedFetched.value = response.included;
      showData.value = response.data;

      // if (response.meta.total_pages !== numberOfPage.value) {
      //   currentPage.value = 1;
      //   console.log("reher");
      // }

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

  updatePath();

  fetchData(currentPage.value);
};

const updatePath = () => {
  const obj = {
    fillterSort: qs.stringify(filterCriterias.value as FiltersQueryType, {
      allowEmptyArrays: true,
    }),
    page: currentPage.value,
    cart: qs.stringify(childShoppingList.value as ShoppingCartListType, {
      allowEmptyArrays: true,
    }),
  };

  // console.log(qs.stringify(params));

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

const sortField = ref<SortType>("none");
const receiveSortData = (data: SortType) => {
  sortField.value = data;

  filterCriterias.value.sortField = data;

  updatePath();
};

// onMounted(() => {
//   console.log(qs.parse(qs.parse(route.query)["obj"]));

//   const parsedObj = qs.parse(qs.parse(route.query)["obj"]);
//   if (Object.entries(parsedObj).length !== 0) {
//     if (parsedObj.filters[0] === "") parsedObj.filters = [];
//     filterCriterias.value = parsedObj as FiltersQueryType;
//   }

//   fetchData(filterCriterias.value, 1);
// });

onBeforeMount(() => {
  // console.log(qs.parse(qs.stringify(route.query)).filters[0]);

  // console.log("route.query :", qs.stringify(route.query));
  // console.log(qs.parse(route.query));
  console.log(qs.parse(qs.parse(route.query)["obj"]));

  const fillterSortObj = qs.parse(qs.parse(route.query)["fillterSort"]);
  const cartObj = qs.parse(qs.parse(route.query)["cart"]);
  if (Object.entries(fillterSortObj).length !== 0) {
    if (fillterSortObj.filters[0] === "") fillterSortObj.filters = [];
    if (fillterSortObj.onlyExist === "false") fillterSortObj.onlyExist = false;
    else fillterSortObj.onlyExist = true;
    filterCriterias.value = fillterSortObj as FiltersQueryType;
    sortField.value = (fillterSortObj as FiltersQueryType).sortField;
    console.log("page :", qs.parse(route.query)["page"]);

    currentPage.value = +qs.parse(route.query)["page"] as number;
    console.log(cartObj);

    if (firstRefresh.value) {
      childShoppingList.value.products = (
        cartObj as ShoppingCartListType
      ).products.map((item) => {
        return { ...item, count: +item.count };
      });
      emit("shopping-data", childShoppingList.value);
      firstRefresh.value = false;
    } else {
      childShoppingList.value = fatherShoppingList.value;

      // childShoppingList.value.products.
      updatePath();
    }

    // const navEntries = window.performance.getEntriesByType("navigation");
    // const isReloaded =
    //   navEntries.length &&
    //   (navEntries[0] as PerformanceNavigationTiming).type === "reload";

    // if (isReloaded) {
    //   console.log("reloaded");

    //   childShoppingList.value.products = (
    //     cartObj as ShoppingCartListType
    //   ).products.map((item) => {
    //     return { ...item, count: +item.count };
    //   });
    // }

    console.log("run before mpunr ", currentPage.value);
  }

  fetchData(1);
});

// const handlePopState = () => {
//       console.log("Navigated using back/forward button");
//     };

// onMounted(() => {
//       window.addEventListener('popstate', handlePopState);

//       // Detect internal route changes
//       router.beforeEach((to, from, next) => {
//         console.log("Route path changed");
//         next();
//       });
//     });

//     // Clean up event listener on component unmount
//     onBeforeUnmount(() => {
//       window.removeEventListener('popstate', handlePopState);
//     });

watch(sortField, (newVal) => {
  filterCriterias.value.sortField = newVal;
  fetchData(currentPage.value);
});
</script>

<template>
  <div class="p-5">
    <!-- <router-view /> -->

    <div class="grid grid-cols-4 p-5 gap-4">
      <div
        class="col-span-3 grid grid-cols-3 gap-3 auto-rows-min justify-start items-start"
      >
        <Sort @data-sort="receiveSortData" :prevSort="sortField"></Sort>

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
          @shopping-data="passShoppingData"
        ></ShowCards>

        <Pagination
          :numberOfPages="numberOfPage"
          :stepNum="3"
          :startPage="currentPage"
          :lastPage="lastPage"
          @data-page="receivePageData"
        ></Pagination>
      </div>

      <Filter
        @data-fetched="recieveDataFetched"
        :filterData="filtersType"
        :previousFilterCriterias="filterCriterias"
      ></Filter>
    </div>
  </div>
</template>

<style scoped></style>
