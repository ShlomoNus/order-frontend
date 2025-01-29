import { RootState } from "@/store";
import OrderedCategory from "./orderedCategory";
import { useSelector } from "react-redux";

export default function Order() {
  const { orderedCategories } = useSelector((state: RootState) => state.order);

  const categoryKeys = Object.keys(orderedCategories);

  return (
    <>
      {categoryKeys.length > 0 && (
        <div
          className="flex flex-row-reverse w-full pr-28 gap-3 flex-wrap
"
        >
          {Object.entries(orderedCategories).map(
            ([category, orderedProducts]) => {
              return (
                <OrderedCategory
                  key={category}
                  category={category}
                  orderedProducts={orderedProducts}
                />
              );
            },
          )}
        </div>
      )}
    </>
  );
}
