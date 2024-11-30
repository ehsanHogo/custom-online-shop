import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modals", {
  state: () => ({
    cattegoriesModal: false,
  }),

  actions: {
    toggleCattegoriesModal() {
      this.cattegoriesModal = !this.cattegoriesModal;
    },
  },
});
