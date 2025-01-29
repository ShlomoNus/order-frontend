import { useDispatch } from "react-redux";
import { Button } from "../_ui/button";
import { deleteProduct, updateProductAmount } from "@/slices/order";
import { AppDispatch } from "@/store";

export default function OrderedProduct({
  category,
  product,
}: {
  category: string;
  product: {
    name: string;
    amount: number;
  };
}) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <li className="flex flex-row items-center">
      <Button
        className="text-black bg-white hover:text-white"
        onClick={() =>
          dispatch(
            deleteProduct({
              categoryName: category,
              productName: product.name,
            }),
          )
        }
      >
        X
      </Button>
      <Button
        className="text-black bg-white hover:text-white"
        onClick={() =>
          dispatch(
            updateProductAmount({
              actionName: "decrement",
              categoryName: category,
              productName: product.name,
            }),
          )
        }
      >
        -
      </Button>
      <Button
        className="text-black bg-white hover:text-white"
        onClick={() =>
          dispatch(
            updateProductAmount({
              actionName: "increment",
              categoryName: category,
              productName: product.name,
            }),
          )
        }
      >
        +
      </Button>
      <div>
        {product.amount} - {product.name}
      </div>
    </li>
  );
}
