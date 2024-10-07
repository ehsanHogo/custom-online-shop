<script setup lang="ts"></script>

<template>
  <div class="flex bg-slate-300 px-20 py-1">
    <button class="flex justify-start items-center gap-1 w-1/6 text-myGray-9">
      <p class="text-sm">خرید</p>
      <img src="../assets/header/shopping-cart.png" alt="shopping cart" />
    </button>
    <button class="flex justify-start items-center gap-1 w-1/6 text-myGray-9">
      <p class="text-sm">ورود | ثبت نام</p>
      <img src="../assets/header/Login.png" alt="" />
    </button>
    <div
      class="flex justify-between px-2 items-center gap-3 w-3/6 border border-[#AFAFAF] rounded-md"
    >
      <img src="../assets/header/search-normal.png" alt="search" />
      <input type="text" class="w-[70%] outline-none" />
      <button class="text-redp">جستجو</button>
    </div>
    <button class="flex justify-end items-center gap-2 w-1/6 text-myGray-9">
      <div>
        <p>کاستومی</p>
        <p class="text-nowrap">فروشگاه اینترنتی</p>
      </div>
      <img src="../assets/LOGO.png" alt="online shop logo" />
    </button>
  </div>
</template>

<style scoped></style>
