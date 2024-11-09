<script setup lang="ts">
import { ref } from "vue";
import useCartStore from "../../store/useCartStore";

interface MyProps {
  productId: string;
}

//store
const cartStore = useCartStore();

const props = defineProps<MyProps>();
const itemNumber = ref(cartStore.getCountById(props.productId));

const decItemNum = () => {
  if (itemNumber.value - 1 >= 0) itemNumber.value -= 1;
  cartStore.updateProductsById(props.productId, itemNumber.value);
};

const incItemNum = () => {
  itemNumber.value += 1;
  cartStore.updateProductsById(props.productId, itemNumber.value);
};
</script>

<template>
  <div class="flex">
    <button
      @click="incItemNum"
      class="border border-myGray-4 px-3 py-2 rounded-r-sm"
    >
      <p>+</p>
    </button>

    <div class="border border-myGray-4 px-3 py-2">
      <b>{{ itemNumber }}</b>
    </div>
    <button
      @click="decItemNum"
      class="border border-myGray-4 px-3 py-2 rounded-l-sm"
    >
      <p>-</p>
    </button>
  </div>
</template>
