<script setup lang="ts">
import { ref } from "vue";
import AddRemoveProduct from "../../generall/AddRemoveProduct.vue";
import useCartStore from "../../../store/useCartStore";
interface CardData {
  name?: string;
  price?: string;
  description?: string;
  imageUrl?: string;
  id: string;
  count: number;
}
//store
const cartStore = useCartStore();

const props = withDefaults(defineProps<CardData>(), {
  name: "",
  price: "",
  description: "",
  imageUrl: "",
  id: "",
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

const addFirstItem = () => {
  changeToCounter.value = true;

  cartStore.addProduct({
    name: props.name,
    image: props.imageUrl,
    count: 1,
    price: props.price,
    id: props.id,
  });
};

const calCount = () => {
  const result = cartStore.getCountById(props.id);

  return result === 0 ? false : true;
};
const changeToCounter = ref(calCount());

cartStore.$subscribe((mutation) => {
  const events = Array.isArray(mutation.events)
    ? mutation.events
    : [mutation.events];

  events.forEach((event) => {
    if (
      (event.type === "delete" || event.type === "set") &&
      event.oldValue.id === props.id
    ) {
      changeToCounter.value = false;
    }
  });
  console.log(mutation.events);
});
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
      <div dir="rtl">
        <AddRemoveProduct
          :productId="props.id"
          v-if="changeToCounter"
        ></AddRemoveProduct>
      </div>
    </div>
  </div>
</template>
