<script setup lang="ts">
import { ref } from "vue";

const isFocused = ref(false);

const handleSearchInput = (e: Event) => {
  if ((e.target as HTMLInputElement).value === "") {
    isFocused.value = false;
  } else {
    isFocused.value = true;
  }
};
</script>
<template>
  <div
    class="flex px-2 py-1 items-center gap-3 border border-[#AFAFAF] rounded-md md:w-[50%] w-full my-2"
  >
    <button>
      <img
        src="../../../assets/images/header/search-normal.png"
        alt="search logo"
      />
    </button>

    <div class="flex items-center justify-end w-full relative">
      <!-- <div v-if="!isFocused" class="flex justify-center items-center"> -->
      <img
        v-if="!isFocused"
        src="../../../assets/images/header/custom-brand-name.png"
        alt="online shop brand"
        class="w-14 h-fit absolute -translate-x-16"
      />
      <!-- </div> -->
      <input
        type="text"
        placeholder="جستجو در"
        class="w-[80%] outline-none bg-inherit text-black placeholder:text-redp"
        dir="rtl"
        @input="handleSearchInput"
      />
    </div>
    <!-- <button class="text-redp"> -->

    <!-- </button> -->
  </div>
</template>
