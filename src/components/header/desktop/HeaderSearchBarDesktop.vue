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
    class="flex justify-between px-2 items-center gap-3 border border-[#AFAFAF] rounded-md md:w-[50%] w-full my-2"
  >
    <button>
      <img
        src="../../../assets/images/header/search-normal.png"
        alt="search logo"
      />
    </button>
    <input
      type="text"
      placeholder="جستجو"
      class="w-[70%] outline-none bg-inherit text-black placeholder:text-redp"
      dir="rtl"
      @input="handleSearchInput"
    />
  </div>
</template>
