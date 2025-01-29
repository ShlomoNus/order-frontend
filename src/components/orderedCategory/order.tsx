import OrderedCategory from "./orderedCategory";

export default function Order() {
  const x = [1, 2, 3];

  return (
    <div className="flex flex-row">
      {x.map((_) => (
        <OrderedCategory />
      ))}
    </div>
  );
}
