import OrderSelect from "@/components/orderSelect";
import { ProductsInput } from "@/components/productsInput";
import { fetchCategories } from "@/slices/categories";
import { AppDispatch, RootState } from "@/store";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SecondPage() {
  const categories = useSelector((state: RootState) => state.categories);

  const itemsProp = useMemo(() => {
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
    <div className="h-svh flex flex-row justify-center items-center">
      <ProductsInput itemsProp={itemsProp} />
      <OrderSelect />
    </div>
  );
}
