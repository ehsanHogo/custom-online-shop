<script setup lang="ts">
import useCartStore from "../../store/useCartStore";
import { storeToRefs } from "pinia";
import ShoppingProductDesktop from "./desktop/ShoppingProductDesktop.vue";

//store
const cartStore = useCartStore();
const { products } = storeToRefs(cartStore);
</script>
<template>
  <div class="col-span-2 p-5" dir="rtl">
    <div class="border-b border-b-myGray-4 pb-4">
      <b class="text-myGray-9 mr-10">سبد خرید</b>
    </div>

    <div class="">
      <ul v-if="products.length !== 0">
        <li v-for="item in products" :key="item.id">
          <ShoppingProductDesktop
            :name="item.name"
            :price="item.price"
            :image="item.image"
            :count="item.count"
            :id="item.id"
          ></ShoppingProductDesktop>
        </li>
      </ul>
    </div>
  </div>
</template>
