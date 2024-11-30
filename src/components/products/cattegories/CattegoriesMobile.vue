<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useModalStore } from "../../../store/useModalsStore";

const categories: string[] = [
  "پوشاک",
  "لوازم خانه",
  "قاب موبایل",
  "اکسسوری",
  "مدرسه و اداره",
  "کارت و پوستر",
  "جشن و مهمانی",
];

const helpList: string[] = [
  "همراه با کاستومی",
  "خدمات مشتریان",
  "راهنمای خرید",
];

const modalsStore = useModalStore();

// const  cattegoriesShow = storeToRefs(modalsStore.)
</script>

<template>
  <VaModal
    ref="modal"
    v-model="modalsStore.cattegoriesModal"
    fullscreen
    hide-default-actions
  >
    <div class="flex flex-col items-center px-5 font-MyFont">
      <button
        v-for="(cat, index) in categories"
        :key="index"
        class="text-myGray-9 flex justify-between mb-5 w-full"
      >
        <img
          src="../../../assets/images/body/products/Vector.png"
          alt="left arrow"
        />
        <b> {{ cat }}</b>
      </button>
      <br />
      <button
        v-for="(cat, index) in helpList"
        :key="index"
        class="text-myGray-9 flex justify-between mb-5 w-full"
      >
        <img
          src="../../../assets/images/body/products/Vector.png"
          alt="left arrow"
        />
        <p>{{ cat }}</p>
      </button>
    </div>
  </VaModal>
</template>

<!-- 
<VaButton
@click="$refs.modal.show()"
>
Show modal
</VaButton> -->
