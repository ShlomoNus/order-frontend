import { Button } from "../_ui/button";

export default function OrderedProduct({
  product,
}: {
  product: {
    name: string;
    amount: number;
  };
}) {
  return (
    <li className="flex flex-row items-center">
      <Button className="text-black bg-white hover:text-white">X</Button>
      <Button className="text-black bg-white hover:text-white">-</Button>
      <Button className="text-black bg-white hover:text-white">+</Button>
      <div>
        {product.amount} - {product.name}
      </div>
    </li>
  );
}
