"use client"
 
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormMessage, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpUser } from "../api/api";
 
const formSchema = z.object({
  username: z.string().min(2).max(20),
  password: z.string().min(8)
});

export default function SignUpPage() {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: ""
        },
      });

      async function onSubmit(values: z.infer<typeof formSchema>) {
        const {username, password} = values;
        try {
            await signUpUser({username, password});
        }
        catch(err){
            console.log(err);
        }
      }
      
      return (
        <div className="max-w-[15vw] min-w-[300px] mx-auto">
  <h2 className="text-2xl font-bold tracking-tight text-center mb-6">Sign Up</h2>
  <div className="bg-secondary shadow-md rounded-lg p-6">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 mt-1" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground font-semibold py-2 shadow-md"
        >
          Submit
        </Button>
      </form>
    </Form>
  </div>
</div>

      )
}