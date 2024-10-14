<script setup lang="ts"></script>
<template>
  <div class="flexbg-primaryShade6 w-full h-35 justify-around">
    <div class="flex flex-col justify-center gap-4">
      <p class="text-white">ما را در شبکه های اجتماعی دنبال کنید</p>
      <div class="flex justify-center items-center gap-3">
        <button>
          <img src="../../assets/footer/facebook.png" alt="facebook icon" />
        </button>
        <button>
          <img src="../../assets/footer/pintrest.png" alt="pintrest icon" />
        </button>
        <button>
          <img
            src="../../assets/footer/Instagram svg.png"
            alt="instagram icon"
          />
        </button>
        <button>
          <img src="../../assets/footer/YouTube svg.png" alt="youtube icon" />
        </button>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center gap-4">
      <p class="text-white">
        برای دریافت آخرین اخبار و تخفیف های جدید،ایمیل خود را وارد نمایید
      </p>
      <div class="flex gap-2">
        <button class="bg-redp py-2 px-4 rounded-sm">
          <p class="text-white text-center">ثبت</p>
        </button>

        <input
          type="text"
          class="outline-none rounded-sm px-2 bg-primaryShade6 border border-myGray-6 text-white"
          placeholder="ایمیل شما"
          dir="rtl"
        />
      </div>
    </div>
  </div>
</template>
