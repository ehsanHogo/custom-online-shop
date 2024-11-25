<template>
  <div
    class="col-span-1 border border-myGray-4 py-3 px-8 rounded-md flex flex-col justify-around"
    dir="rtl"
  >
    <div class="flex flex-col gap-3 border-b border-b-myGray-4 pb-5">
      <b class="text-myGray-10">کد تخفیف</b>
      <p class="text-myGray-9">
        کد تخفیف کد معرف کارت هدیه خود را در زیر وارد کرده و دکمه ثبت رو بزنید
        تا در صورت داشتن اعتبار به سفارش شما اعمال شود
      </p>

      <div class="flex gap-5 mt-3">
        <input
          type="text"
          class="outline-none rounded-sm px-2 border border-myGray-4 h-10"
        />

        <button class="border border-redp w-36 rounded-sm text-redp">
          <b> ثبت</b>
        </button>
      </div>
    </div>
    <div class="flex flex-col mt-3 border-b border-b-myGray-4 pb-5 gap-3">
      <div class="flex justify-between">
        <div class="">
          <p class="text-myGray-9">قیمت کالاها</p>
          <small>تعداد کالا</small>
        </div>
        <p class="text-myGray-9">240,000 تومان</p>
      </div>

      <div class="flex justify-between">
        <div class="flex gap-1">
          <img
            src="../../assets/images/body/shopping cart/receipt-disscount.png"
            alt=""
          />
          <p class="text-myGray-9">مجموع تخفیف روی کالاها</p>
        </div>
        <p class="text-myGray-9"><span class="text-redp">20,000</span> تومان</p>
      </div>

      <div class="flex justify-between">
        <p class="text-myGray-10">سود شما از خرید</p>
        <p class="text-myGray-10">240,000 تومان</p>
      </div>

      <div class="flex justify-between">
        <p class="text-myGray-10">هزینه ارسال</p>
        <p class="text-myGray-10">240,000 تومان</p>
      </div>
    </div>

    <div class="mt-3">
      <div class="flex justify-between">
        <b> جمع مبلغ قابل پرداخت </b>
        <b>240,000 تومان</b>
      </div>
    </div>

    <div class="flex justify-center mt-5">
      <button
        class="bg-redp flex gap-3 w-[50%] p-3 justify-center items-center rounded-sm"
      >
        <b class="text-white">ثبت سفارش</b>
        <img src="../../assets/images/body/shopping cart/Vector.png" alt="" />
      </button>
    </div>
  </div>
</template>
