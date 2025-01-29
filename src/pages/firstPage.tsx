import ProductSelect from "@/components/productsSelect";
import { ProductsInput } from "@/components/productsInput";
import { fetchCategories } from "@/slices/categories";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Order from "@/components/orderedCategory/order";
import { Button } from "@/components/_ui/button";
import { Link } from "react-router";

export default function FirstPage() {
  const { totalProducts } = useSelector((state: RootState) => state.order);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-20 items-center gap-10 h-svh">
      <h1> קניות דיגטליות ששון בע''מ</h1>
      <div className="flex flex-row gap-10">
        <ProductsInput />
        <ProductSelect />
      </div>
      <Order />
      <Link to="/second-page">
        <Button
          disabled={totalProducts.length === 0}
          className="fixed bottom-16 left-8 bg-blue-600"
        >
          המשך הזמנה
        </Button>
      </Link>
    </div>
  );
}
