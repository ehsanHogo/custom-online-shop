<script setup lang="ts">
import { onMounted, ref } from "vue";

// const dataFetched = ref();
interface CardData {
  name: string;
  price: string;
  description: string;
}

const productImage = ref<string>("");

const props = defineProps<CardData>();

const fetchImage = async (itemName: string) => {
  try {
    const res = await fetch(
      `https://demo.spreecommerce.org/api/v2/storefront/products/${itemName}?include=images`
    );
    if (!res.ok) {
      throw Error("error in fetch");
    } else {
      const response = await res.json();

      //   console.log(
      //     `included ${itemName} : `,
      //     response.included[0].attributes.original_url
      //   );

      productImage.value = response.included[0].attributes.original_url;
    }
  } catch (error) {
    console.log(error);
  }
};

const extractTextFromString = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const paragraphs = doc.querySelectorAll("*");

  const extractedText = Array.from(paragraphs)
    .map((p) => p.textContent)
    .join(" ");

  return extractedText;
};

onMounted(() => {
  fetchImage(props.name);
});
</script>

<template>
  <div
    class="max-w-[250px] border drop-shadow-md rounded-md p-4 flex flex-col gap-3"
  >
    <img
      class="rounded-sm h-[200px]"
      :src="productImage"
      alt="product picture"
    />
    <div class="flex justify-between">
      <b>{{ props.name }}</b>
      <button>
        <img src="../../assets/body/heart.png" alt="heart icon" />
      </button>
    </div>

    <p class="truncate ...">
      {{ extractTextFromString(props.description) }}
    </p>
    <b>{{ props.price }} </b>
  </div>
</template>
