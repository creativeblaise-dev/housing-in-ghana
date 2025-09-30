"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
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
import { authClient } from "@/lib/auth-client"; // Import your better-auth client

type Props = {
  formSchema: z.ZodObject<any>;
  defaultValues: Record<string, any>;
  onSubmit?: (
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

    // Show immediate feedback
    const loadingToast = toast.loading(
      isSignIn ? "Signing you in..." : "Creating your account..."
    );

    try {
      let result;

      if (isSignIn) {
        // Use better-auth signIn method
        const { data: authData, error } = await authClient.signIn.email({
          email: data.email,
          password: data.password,
        });

        if (error) {
          result = { success: false, error: error.message };
        } else {
          result = { success: true };

          // Better-auth usually handles session automatically
          // Force a router refresh to update auth state immediately
          router.refresh();

          toast.success("Successfully signed in!", {
            id: loadingToast,
          });

          // Use replace for better UX and immediate redirect
          router.replace("/");
          return;
        }
      } else {
        // Use better-auth signUp method
        const { data: authData, error } = await authClient.signUp.email({
          name: data.name,
          email: data.email,
          password: data.password,
        });

        if (error) {
          result = { success: false, error: error.message };
        } else {
          result = { success: true };

          toast.success("Account created! Check your email for verification.", {
            id: loadingToast,
          });

          // Auto sign-in after successful sign-up with better-auth
          const { error: signInError } = await authClient.signIn.email({
            email: data.email,
            password: data.password,
          });

          if (!signInError) {
            router.refresh();
            router.replace("/");
            return;
          }
        }
      }

      // Handle custom onSubmit if provided (fallback)
      if (onSubmit && !result?.success) {
        result = await onSubmit(data);
      }

      if (result?.success) {
        toast.success(
          isSignIn
            ? "Successfully signed in!"
            : "Account created successfully!",
          { id: loadingToast }
        );

        router.refresh();
        router.replace("/");
      } else {
        toast.error(result?.error || "Authentication failed!", {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("An unexpected error occurred!", {
        id: loadingToast,
      });
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
                      disabled={isLoading}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="flex justify-end">
            <Button
              className="w-full bg-[#1c1c1c] hover:bg-[#2c2c2c] transition-colors duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin size-4 mr-2" />
                  {isSignIn ? "Signing In..." : "Creating Account..."}
                </>
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
          className="text-red-600 font-bold hover:text-red-700 transition-colors duration-200"
        >
          {isSignIn ? " Sign up " : " Sign in "}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
