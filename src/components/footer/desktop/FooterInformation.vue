<script setup lang="ts">
import InformationLinkSection from "./InformationLinkSection.vue";
import InformationShopping from "./InformationShopping.vue";

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
      <InformationShopping></InformationShopping>

      <InformationLinkSection
        title="راهنمای خرید"
        :linkList="buyGuidelineLinks"
      ></InformationLinkSection>

      <InformationLinkSection
        title="خدمات مشتریان"
        :linkList="userServicesLinks"
      ></InformationLinkSection>
      <InformationLinkSection
        title="همراه با کاستومی"
        :linkList="withCustomeSectionLinks"
      ></InformationLinkSection>
    </div>
    <div class="flex justify-end px-4 text-white">
      <p>تمام حقوق این وبسایت متعلق به فروشگاه آنلاین کاستومی می باشد</p>
    </div>
  </div>
</template>
