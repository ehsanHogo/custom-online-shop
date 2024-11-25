<script setup lang="ts">
import AddRemoveProduct from "../Common/AddRemoveProduct.vue";
import { ShoppingProductType } from "../../types/interfaces";
import useCartStore from "../../store/useCartStore";

const props = defineProps<ShoppingProductType>();

//store
const cartStore = useCartStore();

const handleDelete = () => {
  cartStore.updateProductsById(props.id, 0);
};
</script>

<template>
  <div class="border-b border-b-myGray-4 pb-4 mt-5">
    <div class="flex justify-evenly items-center">
      <button @click="handleDelete">
        <img
          src="../../assets/images/body/shopping cart/close-square.png"
          alt="delete product"
        />
      </button>
      <div>
        <img
          :src="props.image"
          alt="product picture"
          class="rounded-sm h-[150px] w-[150px]"
        />
      </div>
      <b> {{ props.name }}</b>
      <b>{{ props.price }} </b>

      <AddRemoveProduct :productId="props.id"></AddRemoveProduct>
    </div>
    <div class="flex justify-end gap-3 mt-3">
      <img src="../../assets/images/body/shopping cart/truck-fast.png" alt="" />
      <b class="text-myGray-9">ارسال از سه روز آینده</b>
    </div>
  </div>
</template>
