import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderedProduct {
  name: string;
  amount: number;
}

const initialState: {
  orderedCategories: Record<string, OrderedProduct[]>;
  lastSelectedProduct: string;
  totalProducts: string[];
} = {
  orderedCategories: {},
  lastSelectedProduct: "",
  totalProducts: [],
};

const orderSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetOrderState: () => initialState,
    addProductToOrder: (
      state,
      action: PayloadAction<{ categoryName: string; productName: string }>,
    ) => {
      const { categoryName, productName } = action.payload;

      if (state.totalProducts.includes(productName)) {
        return;
      }

      if (!state.orderedCategories[categoryName]) {
        state.orderedCategories[categoryName] = [];
      }

      state.orderedCategories[categoryName].push({
        name: productName,
        amount: 1,
      });
      state.lastSelectedProduct = productName;

      state.totalProducts.push(productName);
    },

    updateProductAmount: (
      state,
      action: PayloadAction<{
        categoryName: string;
        productName: string;
        actionName: "increment" | "decrement";
      }>,
    ) => {
      console.log("mdksdks");

      const { categoryName, productName, actionName } = action.payload;

      const category = state.orderedCategories[categoryName];

      if (!category) return;

      const product = category.find((p) => p.name === productName);

      if (!product) return;

      if (actionName === "increment") {
        product.amount += 1;
      } else if (actionName === "decrement" && product.amount > 0) {
        product.amount -= 1;
      }

      if (product.amount === 0) {
        state.orderedCategories[categoryName] = category.filter(
          (p) => p.name !== productName,
        );
        state.totalProducts = state.totalProducts.filter(
          (p) => p !== productName,
        );

        if (state.orderedCategories[categoryName].length === 0) {
          delete state.orderedCategories[categoryName];
        }
      }
    },

    deleteProduct: (
      state,
      action: PayloadAction<{ categoryName: string; productName: string }>,
    ) => {
      const { categoryName, productName } = action.payload;

      const category = state.orderedCategories[categoryName];

      if (!category) return;

      state.orderedCategories[categoryName] = category.filter(
        (p) => p.name !== productName,
      );

      if (state.orderedCategories[categoryName].length === 0) {
        delete state.orderedCategories[categoryName];
      }

      state.totalProducts = state.totalProducts.filter(
        (p) => p !== productName,
      );
    },

    unSelectProduct(state) {
      state.lastSelectedProduct = "";
    },
  },
});

export const {
  addProductToOrder,
  updateProductAmount,
  deleteProduct,
  unSelectProduct,
  resetOrderState,
} = orderSlice.actions;

export default orderSlice.reducer;
