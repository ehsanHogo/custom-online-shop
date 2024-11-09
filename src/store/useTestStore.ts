import { defineStore } from "pinia";

 const useTestStore = defineStore("test", {
  state: () => ({
    counter: 0,
  }),
  getters: {
    getCounter: (state) => {
      state.counter;
    },
  },

  actions: {
    increment() {
      this.counter += 1;
    },
  },
});

export default useTestStore
