<script setup lang="ts">
import LinkSection from "./LinkSection.vue";
import ShopInfo from "./ShopInfo.vue";

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
      <ShopInfo></ShopInfo>

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
