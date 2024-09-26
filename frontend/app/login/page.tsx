"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormMessage, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "../api/api";
import { useRouter } from "next/navigation";
import { useUser } from "../contexts/UserContext";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { delay, handleError } from "../utils/utils";
import {toast} from 'sonner';
 
const formSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(8)
});

export default function LoginPage() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: ""
        },
      });
      const userContext = useUser();
      
      const [loading, setLoading] = useState(false);

      async function onSubmit(values: z.infer<typeof formSchema>) {
        const {username, password} = values;
        setLoading(true);
        try {
            await delay(2000);
            await loginUser({username, password});
            if(!userContext) {
                throw Error("User not found!");
            }
            const { updateUserContext } = userContext;
            updateUserContext(username);
            router.push("/tasks");
        }
        catch(err){
          const error = handleError(err);
          toast.error(error);
        }
        finally {
          setLoading(false);
        }
      }
      
      return (
        <div className="max-w-[15vw] min-w-[300px] mx-auto">
  <h2 className="text-2xl font-bold tracking-tight text-center mb-6">Login</h2>
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
                  className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
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
                  className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-500 mt-1" />
            </FormItem>
          )}
        />
        <Button
        disabled={loading}
          type="submit"
          className="w-full bg-primary text-primary-foreground font-semibold py-2 shadow-md"
        >
          {!loading ? "Submit" : <ThreeDots color="white" height="20"
  width="30"/>}
        </Button>
      </form>
    </Form>
  </div>
</div>

      )
}