import { Button } from "../_ui/button";

export default function OrderedProduct({ name }: { name: string }) {
  return (
    <div className="flex flex-row">
      <Button>X</Button>
      <Button>-</Button>
      <Button>+</Button>
      <div>{name}</div>
    </div>
  );
}
