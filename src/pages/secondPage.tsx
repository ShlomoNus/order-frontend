import ProductSelect from "@/components/productsSelect";
import { ProductsInput } from "@/components/productsInput";
import { fetchCategories } from "@/slices/categories";
import { AppDispatch, RootState } from "@/store";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Order from "@/components/orderedCategory/order";

export default function SecondPage() {
  const categories = useSelector((state: RootState) => state.categories);

  const productList = useMemo(() => {
    if (!categories.selectedCategory) return [];

    const category = categories.categories.find(
      ({ name }) => name === categories.selectedCategory,
    );

    return category?.products.map(({ name }) => name) || [];
  }, [categories]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1> קניות דיגטליות ששון בע''מ</h1>
      <div className="flex flex-row">
        <ProductsInput productList={productList} />
        <ProductSelect />
      </div>

      <Order />
    </div>
  );
}
