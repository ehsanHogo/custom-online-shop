<script setup lang="ts">
import { ref } from "vue";

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

const itemNumber = ref(1);
const changeToCounter = ref(false);

const addFirstItem = () => {
  changeToCounter.value = true;
};
const decItemNum = () => {
  if (itemNumber.value - 1 !== 0) itemNumber.value -= 1;
  else changeToCounter.value = false;
};

const incItemNum = () => {
  itemNumber.value += 1;
};
</script>

<template>
  <div
    class="max-w-[250px] border drop-shadow-md rounded-md p-4 flex flex-col gap-3 h-[425px] justify-around"
  >
    <img
      class="rounded-sm h-[200px]"
      :src="props.imageUrl"
      alt="product picture"
    />
    <div class="flex justify-between">
      <b>{{ props.name }}</b>
      <button>
        <img src="../../../assets/body/heart.png" alt="heart icon" />
      </button>
    </div>

    <p class="truncate ...">
      {{ extractTextFromString(props.description) }}
    </p>
    <b>{{ props.price }} </b>

    <div class="flex justify-end">
      <button
        v-if="!changeToCounter"
        @click="addFirstItem"
        class="bg-redp flex justify-center items-center p-2 w-fit rounded-sm gap-2"
      >
        <p class="text-white">افزودن به سبد خرید</p>

        <img
          src="../../../assets/body/shopping cart/shopping-cart.png"
          alt="shopping cart"
        />
      </button>

      <div v-if="changeToCounter" class="flex">
        <button
          @click="decItemNum"
          class="border border-myGray-4 px-3 py-2 rounded-l-sm"
        >
          <p>-</p>
        </button>
        <div class="border border-myGray-4 px-3 py-2">
          <b>{{ itemNumber }}</b>
        </div>
        <button
          @click="incItemNum"
          class="border border-myGray-4 px-3 py-2 rounded-r-sm"
        >
          <p>+</p>
        </button>
      </div>
    </div>
  </div>
</template>
