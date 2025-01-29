import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/_ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_ui/form";
import { Input } from "@/components/_ui/input";
import { OrderedProduct, resetOrderState } from "@/slices/order";
import { useNavigate } from "react-router";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { resetCategoryState } from "@/slices/categories";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "שם פרטי חייב להיות לפחות שתי תווים",
  }),
  lastName: z.string().min(2, {
    message: "שם משפחה חייב להיות לפחות שתי תווים",
  }),
  email: z.string().email({
    message: "אנא הכנס מייל תקין",
  }),
});

export default function OrderForm({
  products,
}: {
  products: OrderedProduct[];
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (values: typeof formSchema._type) => {
    try {
      const postBody = { ...values, products };
      const { data } = await axios.post(
        "http://localhost:5050/orders/login",
        postBody,
      );

      console.log("data", data);
    } catch (error) {
      console.error("Error during submission:", error);

      // Optionally display an error message to the user
    } finally {
      dispatch(resetCategoryState());
      dispatch(resetOrderState());
      nav("/");
    }
  };

  return (
    <div className="  max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>שם פרטי</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>שם משפחה</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>איימיל</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-blue-700" type="submit">
            שלח
          </Button>
        </form>
      </Form>
    </div>
  );
}
