import ProductSelect from "@/components/productsSelect";
import { ProductsInput } from "@/components/productsInput";
import { fetchCategories } from "@/slices/categories";
import { AppDispatch } from "@/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Order from "@/components/orderedCategory/order";

export default function FirstPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1> קניות דיגטליות ששון בע''מ</h1>
      <div className="flex flex-row">
        <ProductsInput />
        <ProductSelect />
      </div>

      <Order />
    </div>
  );
}
