import { OrderedProduct as OrderedProductType } from "@/slices/order";
import OrderedProduct from "./orderedProduct";

export default function OrderedCategory({
  category,
  orderedProducts,
}: {
  category: string;
  orderedProducts: OrderedProductType[];
}) {
  return (
    <div className="p-5 border border-black border-solid rounded flex flex-col items-center basis-[25%]">
      <div className="header-z w-40 h-30 bg-blue-800 flex flex-row justify-center items-center rounded text-white">
        <h4>{category}</h4>
      </div>
      <ul className="flex flex-col items-end pr-5">
        {orderedProducts.map((p) => (
          <OrderedProduct product={p} category={category} />
        ))}
      </ul>
    </div>
  );
}
