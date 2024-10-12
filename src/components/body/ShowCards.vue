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

      console.log(
        `included ${itemName} : `,
        response.included[0].attributes.original_url
      );

      productImage.value = response.included[0].attributes.original_url;
    }
  } catch (error) {
    console.log(error);
  }
};

const extractTextFromString = (htmlString: string) => {
  // Parse the string into a document
  // Parse the string into a document
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Extract all <p> elements and get their text content
  const paragraphs = doc.querySelectorAll("*");
  const extractedText = Array.from(paragraphs)
    .map((p) => p.textContent)
    .join(" "); // Join all paragraphs' text with a space

  // Store the extracted text in a variable and return it
  return extractedText;
};

onMounted(() => {
  fetchImage(props.name);
  //   console.log();
});

// const fetchData = async () => {
//   try {
//     const res = await fetch(
//       "https://demo.spreecommerce.org/api/v2/storefront/products",
//       { method: "GET" }
//     );

//     if (!res.ok) {
//       throw Error("error in fetch");
//     } else {
//       const response = await res.json();
//       console.log(response.data);

//       dataFetched.value = response.data;
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };

// onMounted(() => {
//   fetchData();
// });
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
      <img src="../../assets/body/heart.png" alt="heart icon" />
    </div>

    <p class="truncate ...">
      {{ extractTextFromString(props.description) }}
    </p>
    <b>{{ props.price }} </b>
  </div>
</template>
