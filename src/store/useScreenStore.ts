import { defineStore } from "pinia";

const useScreenStore = defineStore("screen", {
  state: () => ({
    isDestop: false as boolean,
  }),

  actions: {
    setIsDesktop(val: boolean) {
      this.isDestop = val;
    },
  },
});

export default useScreenStore;
