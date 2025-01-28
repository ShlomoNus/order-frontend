"use client";

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

export function ProductsInput({ itemsProp = [] }: { itemsProp: string[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setItems(itemsProp);
    setValue("");
  }, [itemsProp]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? items.find((item) => item === value) : "בחר מוצר"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search item..." />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  style={{
                    pointerEvents: selectedValues.has(item) ? "none" : "auto",
                  }}
                  key={item}
                  value={item}
                  onSelect={(currentValue) => {
                    console.log("dmksmdksmdk");

                    setValue(currentValue === value ? "" : currentValue);
                    const newSelectedProductList = new Set([
                      ...selectedValues,
                      currentValue,
                    ]);

                    if (newSelectedProductList.size === selectedValues.size)
                      return;

                    setSelectedValues(new Set(newSelectedProductList));

                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.has(item) ? "opacity-100" : "opacity-0",
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
