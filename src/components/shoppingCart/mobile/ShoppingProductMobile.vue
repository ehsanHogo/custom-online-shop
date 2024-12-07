<script setup lang="ts">
import AddRemoveProduct from "../../Common/AddRemoveProduct.vue";
import useCartStore from "../../../store/useCartStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

//store
const cartStore = useCartStore();
const { products } = storeToRefs(cartStore);

const handleDelete = (id: string) => {
  cartStore.updateProductsById(id, 0);
};

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="col-span-2 p-5" dir="rtl">
    <div
      class="border-b border-b-myGray-4 pb-4 flex justify-start items-center gap-3"
    >
      <button @click="goBack">
        <img
          src="../../../assets/images/body/black-arrow-right.png"
          alt="back icon"
        />
      </button>
      <b class="text-myGray-9">سبد خرید</b>
    </div>

    <div class="">
      <ul v-if="products.length !== 0">
        <li v-for="item in products" :key="item.id">
          <div class="flex flex-col">
            <div class="flex justify-evenly items-center p-3">
              <img
                :src="item.image"
                alt="product picture"
                class="rounded-sm h-[150px] w-[150px]"
              />

              <div class="flex flex-col w-full px-5 gap-4">
                <div class="flex justify-between items-center">
                  <b> {{ item.name }}</b>
                  <button @click="() => handleDelete(item.id)">
                    <img
                      src="../../../assets/images/body/shopping cart/close-square.png"
                      alt="delete product"
                    />
                  </button>
                </div>

                <div class="flex justify-between items-center">
                  <b>تعداد</b>
                  <AddRemoveProduct :productId="item.id"></AddRemoveProduct>
                </div>

                <div class="flex justify-between items-center">
                  <b>قیمت</b>
                  <b>{{ item.price }} </b>
                </div>
              </div>
            </div>

            <div class="flex justify-start gap-3 mt-3">
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
