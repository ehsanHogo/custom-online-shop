<script setup lang="ts">
import ShoppingProduct from "./ShoppingProduct.vue";
</script>
<template>
  <div class="col-span-2 p-5" dir="rtl">
    <div class="border-b border-b-myGray-4 pb-4">
      <b class="text-myGray-9 mr-10">سبد خرید</b>
    </div>

    <div class="">
      <ul>
        <li>
          <ShoppingProduct></ShoppingProduct>
        </li>

        <li>
          <ShoppingProduct></ShoppingProduct>
        </li>
      </ul>
    </div>
  </div>
</template>
