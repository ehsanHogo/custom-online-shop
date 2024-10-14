<script setup lang="ts">
import Filter from "./Filter.vue";
import ShowCards from "./ShowCards.vue";
import { onBeforeMount, ref } from "vue";
import Sort from "./Sort.vue";
import Pagination from "./Pagination.vue";

import Cattegories from "./Cattegories.vue";

interface DataFetchType {
  attributes: {
    name: string;
    slug: string;
    description: string;
    display_price: string;
  };
  relationships: {
    images: {
      data: { id: string; type: string }[];
    };
  };
}

interface IncludedFetchType {
  attributes: {
    original_url: string;
  };
  id: string;
}
const dataFetched = ref<DataFetchType[]>([]);
const includedFetched = ref<IncludedFetchType[]>([]);

const fetchData = async () => {
  try {
    const res = await fetch(
      "https://demo.spreecommerce.org/api/v2/storefront/products?include=images",
      { method: "GET" }
    );

    if (!res.ok) {
      throw Error("error in fetch");
    } else {
      const response = await res.json();
      console.log(response.data);
      console.log(response);
      includedFetched.value = response.included;

      dataFetched.value = response.data;
    }
  } catch (e) {
    console.log(e);
  }
};

const currentPage = ref(1); // recieve update from child

const receiveData = (data: number) => {
  currentPage.value = data;
};

const findImageUrl = (imageId: string) => {
  // console.log("sdfjksj : ", includedFetched);
  const resultItem = includedFetched.value.filter((item) => {
    return item.id === imageId;
  });
  return resultItem[0].attributes.original_url;
};

onBeforeMount(() => {
  fetchData();
});
</script>

<template>
  <div class="p-5">
    <Cattegories></Cattegories>

    <div class="grid grid-cols-4 p-5 gap-4">
      <div class="col-span-3 grid grid-cols-3 gap-3">
        <Sort></Sort>
        <ShowCards
          v-for="(item, index) in dataFetched.slice(
            (currentPage - 1) * 6,
            (currentPage - 1) * 6 + 6
          )"
          :key="index"
          :name="item.attributes.slug"
          :price="item.attributes.display_price"
          :description="item.attributes.description"
          :imageUrl="findImageUrl(item.relationships.images.data[0].id)"
        ></ShowCards>
      </div>

      <Filter></Filter>
    </div>

    <Pagination
      :pagesNum="5"
      :stepNum="2"
      @data-page="receiveData"
    ></Pagination>
  </div>
</template>

<style scoped></style>
