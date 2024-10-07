<script setup lang="ts"></script>

<template>
  <div class="flex bg-slate-300 px-10 py-1 justify-around">
    <button class="flex justify-start items-center gap-1 text-myGray-9">
      <p class="text-sm">خرید</p>
      <img src="../../assets/header/shopping-cart.png" alt="shopping cart" />
    </button>
    <button class="flex justify-start items-center gap-1 text-myGray-9">
      <p class="text-sm">ورود | ثبت نام</p>
      <img src="../../assets/header/Login.png" alt="" />
    </button>
    <div
      class="flex justify-between px-2 items-center gap-3 border border-[#AFAFAF] rounded-md w-[50%]"
    >
      <img src="../../assets/header/search-normal.png" alt="search" />
      <input
        type="text"
        class="w-[70%] outline-none bg-inherit text-black"
        dir="rtl"
      />
      <button class="text-redp">جستجو</button>
    </div>
    <button class="flex justify-end items-center gap-2 text-myGray-9">
      <div class="flex flex-col">
        <img
          src="../../assets/siteBrand/custom-brand-name.png"
          alt="online shop brand"
        />
        <b class="text-nowrap">فروشگاه اینترنتی</b>
      </div>
      <img src="../../assets/siteBrand/LOGO.png" alt="online shop logo" />
    </button>
  </div>
</template>

<style scoped></style>
