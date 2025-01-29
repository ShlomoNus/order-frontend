import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderedProduct {
  name: string;
  amount: number;
}

const initialState: {
  orderedCategories: Record<string, OrderedProduct[]>;
} = {
  orderedCategories: {},
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addProductToOrder: (
      state,
      action: PayloadAction<{ categoryName: string; productName: string }>,
    ) => {
      const { categoryName, productName } = action.payload;

      if (!state.orderedCategories[categoryName]) {
        state.orderedCategories[categoryName] = [];
      }

      state.orderedCategories[categoryName].push({
        name: productName,
        amount: 1,
      });
    },

    updateProductAmount: (
      state,
      action: PayloadAction<{
        categoryName: string;
        productName: string;
        actionName: "increment" | "decrement";
      }>,
    ) => {
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
    },
  },
});

export const { addProductToOrder, updateProductAmount, deleteProduct } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
