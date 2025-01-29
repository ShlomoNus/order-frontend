import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Category {
  name: string;
  products: [{ name: string }];
}

const initialState: {
  categories: Category[];
  loading: boolean;
  selectedCategory: string;
} = {
  categories: [],
  loading: false,
  selectedCategory: "",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetCategoryState: () => initialState,

    selectCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const { data } = await axios.get<Category[]>(
      "http://localhost:8080/api/categories",
    );

    return data;
  },
);

export const { selectCategory, resetCategoryState } = categoriesSlice.actions;

export default categoriesSlice.reducer;
