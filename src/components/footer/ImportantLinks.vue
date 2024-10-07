<script setup lang="ts">
import LinkSection from "./LinkSection.vue";

const withCustomeSectionLinks: string[] = [
  "فروش محصولات",
  "فرصت های همکاری",
  "تماس با ما",
  "نقشه سایت",
];
const userServicesLinks: string[] = [
  "سوالات متداول",
  "حریم خصوصی",
  "ثبت شکایت",
  "ضمانت نامه محصول",
];
const buyGuidelineLinks: string[] = [
  "راهنمای ثبت سفارش",
  "شیوه های پرداخت",
  "نحوه ارسال سفارش ها",
  "شرایط بازگرداندن محصول",
];
</script>

<template>
  <div class="bg-redp flex flex-col gap-9 py-10">
    <div class="flex justify-around">
      <div class="flex flex-col justify-center items-center gap-10">
        <b class="text-white">فروشگاه اینترنتی کاستومی</b>
        <div class="flex gap-10 text-white">
          <p>پاسخگویی 24 ساعته ، 7 روز هفته</p>
          <p>تماس با پشتیبانی : 00003-021</p>
        </div>
        <div class="flex gap-8 mt-2">
          <img src="../../assets/footer/ettehadie.png" alt="ettehadie" />
          <img src="../../assets/footer/sabt-melly.png" alt="sabt melly" />

          <img src="../../assets/footer/e-namad.png" alt="e nammad" class="" />
        </div>
      </div>

      <LinkSection
        title="راهنمای خرید"
        :linkList="buyGuidelineLinks"
      ></LinkSection>

      <LinkSection
        title="خدمات مشتریان"
        :linkList="userServicesLinks"
      ></LinkSection>
      <LinkSection
        title="همراه با کاستومی"
        :linkList="withCustomeSectionLinks"
      ></LinkSection>
    </div>
    <div class="flex justify-end px-4 text-white">
      <p>تمام حقوق این وبسایت متعلق به فروشگاه آنلاین کاستومی می باشد</p>
    </div>
  </div>
</template>
