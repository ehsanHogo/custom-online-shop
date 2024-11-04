<script setup lang="ts">
import ShoppingRegistration from "./ShoppingRegistration.vue";
import ShopppingAlerts from "./ShopppingAlerts.vue";
import ShoppingList from "./ShoppingList.vue";
import {
  FiltersQueryType,
  ShoppingCartListType,
  ShoppingProductType,
} from "../../types/interfaces";
import { onBeforeMount, ref, toRef, watch } from "vue";
import qs from "qs";
import { useRoute, useRouter } from "vue-router";

interface MyProps {
  shoppingList: ShoppingCartListType;
}
const props = defineProps<MyProps>();

const emit = defineEmits(["shopping-data", "filter-sort-page-data"]);
const passShoppingData = (data: ShoppingProductType) => {
  updateShoppingList(data);
  updatePath();
  emit("shopping-data", childShoppingList.value);
};

const shoppingListRef = toRef(props, "shoppingList");
const childShoppingList = ref(shoppingListRef.value);

const firstRefresh = ref(props.shoppingList.firstRefresh);

const updateShoppingList = (data: ShoppingProductType) => {
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

const router = useRouter();

const route = useRoute();
const updatePath = () => {
  const obj = {
    cart: qs.stringify(childShoppingList.value as ShoppingCartListType, {
      allowEmptyArrays: true,
    }),
  };

  router.replace({
    path: "/custom-online-shop/shopping-cart",
    query: obj,
  });
};

onBeforeMount(() => {
  const cartObj = qs.parse(qs.parse(route.query)["cart"]);
  console.log("refresh : ", firstRefresh.value);

  if (
    firstRefresh.value &&
    cartObj !== undefined &&
    cartObj !== null &&
    Object.keys(cartObj).length !== 0
  ) {
    if (cartObj.products[0] === "") {
      childShoppingList.value.products = [];
    } else {
      childShoppingList.value.products = (
        cartObj as ShoppingCartListType
      ).products.map((item) => {
        return { ...item, count: +item.count };
      });
    }

    emit("shopping-data", childShoppingList.value);
    firstRefresh.value = false;
  } else {
    console.log("hererrer");
    console.log(shoppingListRef.value);

    childShoppingList.value = shoppingListRef.value;
    updatePath();
  }
});
</script>

<template>
  <div class="flex justify-center pt-5">
    <img
      src="../../assets/body/shopping cart/steper.png"
      alt="shopping progress"
    />
  </div>

  <div class="grid grid-cols-3 gap-3">
    <div class="flex flex-col gap-5 ml-3 mt-5">
      <ShoppingRegistration></ShoppingRegistration>
      <ShopppingAlerts></ShopppingAlerts>
    </div>
    <ShoppingList
      @shopping-data="passShoppingData"
      :shoppingList="childShoppingList"
    ></ShoppingList>
  </div>
</template>
