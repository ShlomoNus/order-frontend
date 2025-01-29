import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_ui/select";
import { selectCategory } from "@/slices/categories";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

export default function ProductSelect() {
  const categories = useSelector(
    (state: RootState) => state.categories.categories,
  );

  const dispatch = useDispatch<AppDispatch>();

  return (
    <Select
      onValueChange={(value: string) => {
        dispatch(selectCategory(value));
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="בחר קטגוריה" />
      </SelectTrigger>
      <SelectContent>
        {categories.map(({ name }, index) => (
          <SelectItem key={index} value={name}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
