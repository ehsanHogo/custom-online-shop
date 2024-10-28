<script setup lang="ts">
interface Props {
  title: string;
  linkList: string[];
}

const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-3 justify-center text-white" dir="rtl">
    <b class="border-b-2">{{ props.title }}</b>

    <a v-for="(link, index) in props.linkList" :key="index" href="#">{{
      link
    }}</a>
  </div>
</template>
