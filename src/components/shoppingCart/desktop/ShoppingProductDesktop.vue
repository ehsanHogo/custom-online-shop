<script setup lang="ts">
import AddRemoveProduct from "../../Common/AddRemoveProduct.vue";
import { ShoppingProductType } from "../../../types/interfaces";
import useCartStore from "../../../store/useCartStore";
import { storeToRefs } from "pinia";



//store
const cartStore = useCartStore();
const { products } = storeToRefs(cartStore);
const handleDelete = (id: string) => {
  cartStore.updateProductsById(id, 0);
};
</script>

<template>
  <div class="col-span-2 p-5" dir="rtl">
    <div class="border-b border-b-myGray-4 pb-4">
      <b class="text-myGray-9 mr-10">سبد خرید</b>
    </div>

    <div class="">
      <ul v-if="products.length !== 0">
        <li v-for="item in products" :key="item.id">
          <div class="border-b border-b-myGray-4 pb-4 mt-5">
            <div class="flex justify-evenly items-center">
              <button @click="() => handleDelete(item.id)">
                <img
                  src="../../../assets/images/body/shopping cart/close-square.png"
                  alt="delete product"
                />
              </button>
              <div>
                <img
                  :src="item.image"
                  alt="product picture"
                  class="rounded-sm h-[150px] w-[150px]"
                />
              </div>
              <b> {{ item.name }}</b>
              <b>{{ item.price }} </b>

              <AddRemoveProduct :productId="item.id"></AddRemoveProduct>
            </div>
            <div class="flex justify-end gap-3 mt-3">
              <img
                src="../../../assets/images/body/shopping cart/truck-fast.png"
                alt="truck"
              />
              <b class="text-myGray-9">ارسال از سه روز آینده</b>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>
