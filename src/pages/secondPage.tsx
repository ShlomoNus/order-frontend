import OrderForm from "@/components/orderForm";
import FinalProducts from "@/components/finalProducts";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function SecondPage() {
  const { orderedCategories } = useSelector((state: RootState) => state.order);
  const products = Object.entries(orderedCategories).flatMap(([_, v]) => v);

  return (
    <div className="flex flex-row gap-x-28 pt-10 justify-center">
      <OrderForm products={products} />
      <FinalProducts products={products} />
    </div>
  );
}
