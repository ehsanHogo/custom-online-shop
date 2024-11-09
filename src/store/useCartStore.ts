import { defineStore } from "pinia";
import { ShoppingCartListType, ShoppingProductType } from "../types/interfaces";

const useCartStore = defineStore("cart", {
  state: (): ShoppingCartListType => ({
    products: [],
    firstRefresh: false,
  }),
  getters: {},

  actions: {
    updateProductsById(pId: string, pCount: number) {
      const resultIndex = this.products.findIndex((item) => item.id === pId);

      if (pCount === 0) {
        this.products.splice(resultIndex, 1);
      } else {
        this.products[resultIndex].count = pCount;
      }
    },

    addProduct(p: ShoppingProductType) {
      this.products.push(p);
    },
  },
});

export default useCartStore;
