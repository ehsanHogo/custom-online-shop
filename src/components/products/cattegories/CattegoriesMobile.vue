<script setup lang="ts">
import { storeToRefs } from "pinia";
// import { useModalStore } from "../../../store/useModalsStore";
import { ref } from "vue";

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


const showModal = ref(false);


const toggleModal = () => {
  showModal.value = !showModal.value;
};
</script>

<template>
  <button v-if="!showModal">
    <img
      src="../../../assets/images/header/menu.png"
      alt="header menu"
      class="w-8 h-8"
      @click="toggleModal"
    />
  </button>

  <VaModal ref="modal" v-model="showModal" fullscreen hide-default-actions>
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

