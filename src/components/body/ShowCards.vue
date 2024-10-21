<script setup lang="ts">
interface CardData {
  name?: string;
  price?: string;
  description?: string;
  imageUrl?: string;
}

const props = withDefaults(defineProps<CardData>(), {
  name: "",
  price: "",
  description: "",
  imageUrl: "",
});

const extractTextFromString = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const paragraphs = doc.querySelectorAll("*");

  const extractedText = Array.from(paragraphs)
    .map((p) => p.textContent)
    .join(" ");

  return extractedText;
};
</script>

<template>
  <div
    class="max-w-[250px] border drop-shadow-md rounded-md p-4 flex flex-col gap-3 h-[400px]"
  >
    <img
      class="rounded-sm h-[200px]"
      :src="props.imageUrl"
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
