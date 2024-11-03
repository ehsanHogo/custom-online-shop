<script setup lang="ts">
import Header from "./components/header/TheHeader.vue";
import Footer from "./components/footer/TheFooter.vue";

import Cattegories from "./components/products/Cattegories.vue";
import { onBeforeMount, ref } from "vue";
import {
  FiltersQueryType,
  ShoppingCartListType,
  ShoppingProductType,
} from "./types/interfaces";

import qs from "qs";
import { useRoute, useRouter } from "vue-router";

const shoppingList = ref<ShoppingCartListType>({ products: [] });

const router = useRouter();

const route = useRoute();

const filterCriterias = ref<FiltersQueryType>({
  filters: [],
  onlyExist: false,
  sortField: "none",
});

const currentPage = ref(1);

const updateFilterCriterias = (
  filterSortData: FiltersQueryType,
  pageData: number
) => {
  filterCriterias.value = filterSortData;
  currentPage.value = pageData;
  // console.log("emit page" , pageData);
  updatePath();
};

const updateShoppingList = (data: ShoppingProductType) => {
  console.log("add to shopping list");

  const resultIndex = shoppingList.value.products.findIndex(
    (item) => item.id === data.id
  );
  if (resultIndex === -1) {
    shoppingList.value.products = shoppingList.value.products.concat(data);
  } else {
    if (data.count === 0) {
      shoppingList.value.products.splice(resultIndex, 1);
    } else {
      shoppingList.value.products[resultIndex].count = data.count;
    }
  }

  updatePath();
};

const updatePath = () => {
  const obj = {
    obj: qs.stringify(filterCriterias.value as FiltersQueryType, {
      allowEmptyArrays: true,
    }),
    cart: qs.stringify(shoppingList.value as ShoppingCartListType, {
      allowEmptyArrays: true,
    }),
    page: currentPage.value,
  };

  // console.log(qs.stringify(params));

  router.push({
    path: "/custom-online-shop/",
    query: obj,
  });
};

onBeforeMount(() => {
  console.log(qs.parse(route.query["cart"]));
});
</script>

<template>
  <div class="font-MyFont">
    <Header></Header>
    <Cattegories class="pt-5"></Cattegories>
    <!-- <MainBody></MainBody> -->
    <router-view
      @shopping-data="updateShoppingList"
      :shoppingList="shoppingList"
      :filterSortPageData="filterCriterias"
      @filter-sort-page-data="updateFilterCriterias"
    />

    <Footer></Footer>

    <!-- <router-view /> -->
  </div>
</template>

<style scoped></style>
