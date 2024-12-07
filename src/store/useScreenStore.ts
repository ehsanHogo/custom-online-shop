import { defineStore } from "pinia";

const useScreenStore = defineStore("screen", {
  state: () => ({
    isDesktop: false as boolean,
  }),

  actions: {
    setIsDesktop(val: boolean) {
      this.isDesktop = val;
    },
  },
});

export default useScreenStore;
