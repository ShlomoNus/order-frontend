import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./_ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./_ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./_ui/popover";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { addProductToOrder, unSelectProduct } from "@/slices/order";

export function ProductsInput() {
  const dispatch = useDispatch<AppDispatch>();

  const { categories, selectedCategory } = useSelector(
    (state: RootState) => state.categories,
  );

  const { lastSelectedProduct } = useSelector(
    (state: RootState) => state.order,
  );

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<string[]>([]);

  function shouldBeOpen(open: boolean) {
    if (!selectedCategory) {
      return;
    }

    setOpen(open);
  }

  useEffect(() => {
    dispatch(unSelectProduct());
    const newItems =
      categories
        .find((category) => category.name === selectedCategory)
        ?.products.map((product) => product.name) ?? [];

    setItems(newItems);
  }, [selectedCategory, categories, dispatch]);

  return (
    <Popover open={open && !!selectedCategory} onOpenChange={shouldBeOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {lastSelectedProduct || "בחר מוצר"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search item..." />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => {
                    dispatch(
                      addProductToOrder({
                        categoryName: selectedCategory,
                        productName: item,
                      }),
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      lastSelectedProduct === item
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
