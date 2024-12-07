import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modals", {
  state: () => ({
    cattegoriesModal: false,
    sortModal: false,
    filterModal: false,
  }),

  actions: {
    toggleCattegoriesModal() {
      this.cattegoriesModal = !this.cattegoriesModal;
    },
    toggleSortModal() {
      this.sortModal = !this.sortModal;
    },

    toggleFilterModal() {
      this.filterModal = !this.filterModal;
    },
  },
});
