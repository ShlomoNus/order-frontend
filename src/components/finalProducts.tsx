import { OrderedProduct } from "@/slices/order";

export default function FinalProducts({
  products,
}: {
  products: OrderedProduct[];
}) {
  console.log(products);

  return (
    <div className="flex flex-col gap-5 justify-start">
      <div className="text-base font-bold">מוצרים שהזמנתם</div>

      <ul>
        {products.map((p) => (
          <li className="flex flex-row">
            <div className="mr-3">{p.amount}</div> <div>{p.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
