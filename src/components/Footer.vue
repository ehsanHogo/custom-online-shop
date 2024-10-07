<script setup lang="ts"></script>

<template>
  <div class="flex flex-col">
    <div class="flex bg-primaryShade6 w-full h-36 justify-around">
      <div class="flex flex-col justify-center gap-4">
        <p class="text-white">ما را در شبکه های اجتماعی دنبال کنید</p>
        <div class="flex justify-center items-center gap-3">
          <button>
            <img src="../assets/footer/facebook.png" alt="facebook icon" />
          </button>
          <button>
            <img src="../assets/footer/pintrest.png" alt="pintrest icon" />
          </button>
          <button>
            <img
              src="../assets/footer/Instagram svg.png"
              alt="instagram icon"
            />
          </button>
          <button>
            <img src="../assets/footer/YouTube svg.png" alt="youtube icon" />
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

    <div class="bg-redp flex flex-col gap-9 py-10">
      <div class="flex justify-around">
        <div class="flex flex-col justify-center items-center gap-10">
          <b class="text-white">فروشگاه اینترنتی کاستومی</b>
          <div class="flex gap-10 text-white">
            <p>پاسخگویی 24 ساعته ، 7 روز هفته</p>
            <p>تماس با پشتیبانی : 00003-021</p>
          </div>
          <div class="flex gap-8 mt-2">
            <img src="../assets/footer/ettehadie.png" alt="ettehadie" />
            <img src="../assets/footer/sabt-melly.png" alt="sabt melly" />

            <img src="../assets/footer/e-namad.png" alt="e nammad" class="" />
          </div>
        </div>
        <div
          class="text-white flex flex-col gap-3 justify-center justify-start"
          dir="rtl"
        >
          <b class="border-b-2">راهنمای خرید</b>
          <a href="#">راهنمای ثبت سفارش</a>
          <a href="#">شیوه های پرداخت</a>
          <a href="#">نحوه ارسال سفارش ها</a>
          <a href="#">شرایط بازگرداندن محصول</a>
        </div>
        <div class="flex flex-col gap-3 justify-center text-white" dir="rtl">
          <b class="border-b-2">خدمات مشتریان</b>
          <a href="#">سوالات متداول</a>
          <a href="#">حریم خصوصی</a>
          <a href="#">ثبت شکایت</a>
          <a href="#">ضمانت نامه محصول</a>
        </div>

        <div class="flex flex-col gap-3 justify-center text-white" dir="rtl">
          <b class="border-b-2">همراه با کاستومی</b>
          <a href="#">فروش محصولات</a>
          <a href="#">فرصت های همکاری</a>
          <a href="#">تماس با ما</a>
          <a href="#">نقشه سایت</a>
        </div>
      </div>
      <div class="flex justify-end px-4 text-white">
        <p>تمام حقوق این وبسایت متعلق به فروشگاه آنلاین کاستومی می باشد</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
