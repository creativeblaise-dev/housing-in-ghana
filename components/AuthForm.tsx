"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { ZodType } from "zod";

import { Path, useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FIELD_NAMES } from "@/constants";
import { Loader2 } from "lucide-react";

type Props = {
  formSchema: z.ZodObject<any>;
  defaultValues: Record<string, any>;
  onSubmit: (
    data: Record<string, any>
  ) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_UP" | "SIGN_IN";
};

const AuthForm = ({ type, formSchema, defaultValues, onSubmit }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isSignIn = type === "SIGN_IN";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = async (data: Record<string, any>) => {
    setIsLoading(true);
    const result = await onSubmit(data);

    try {
      if (result.success) {
        // Handle successful sign-in or sign-up (e.g., redirect or show a success message)
        toast.success(
          isSignIn
            ? "You have successfully signed in."
            : "Your account has been created."
        );

        router.push("/"); // Redirect to contributor profile page after successful sign-in/sign-up
      } else {
        toast.warning(result.error || "User sign in failed!"); //update this logic for email verification
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-stone-700">
        {isSignIn
          ? "Welcome back to Housing In Ghana"
          : "Create your Housing In Ghana account!"}
      </h1>
      <p className="text-stone-600">
        {isSignIn
          ? "Please enter your credentials."
          : "Please fill in the details below."}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<Record<string, any>>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize text-stone-700 font-bold">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={field.name === "password" ? "password" : "text"}
                      placeholder={field.name === "password" ? "********" : ""}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="flex justify-end">
            <Button
              className="w-full bg-[#1c1c1c]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin size-4 " />
              ) : isSignIn ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <p className="text-stone-700">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="text-red-600 font-bold"
        >
          {isSignIn ? " Sign up " : " Sign in "}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
