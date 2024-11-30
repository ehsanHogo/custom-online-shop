<script setup lang="ts">
import { useModalStore } from "../../../store/useModalsStore";

const modalsStore = useModalStore();

const toggleModal = () => {
  modalsStore.toggleCattegoriesModal();
};
</script>

<template>
  <button>
    <img
      src="../../../assets/images/header/menu.png"
      alt="header menu"
      class="w-8 h-8"
      @click="toggleModal"
    />
  </button>
</template>
