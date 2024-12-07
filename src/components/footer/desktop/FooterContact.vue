<script setup lang="ts">
import SocialMediaLinks from "../SocialMediaLinks.vue";
</script>
<template>
  <div class="flex bg-primaryShade6 w-full h-36 justify-around">
    <div class="flex flex-col justify-center gap-4">
      <p class="text-white">ما را در شبکه های اجتماعی دنبال کنید</p>

      <SocialMediaLinks></SocialMediaLinks>
 
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
