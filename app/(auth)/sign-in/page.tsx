"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/lib/actions/auth";
import { AuthCredentials } from "@/types";

const SignIn = () => (
  <AuthForm
    type="SIGN_IN"
    formSchema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
    }}
    onSubmit={(data: Record<string, any>) =>
      signInWithCredentials(data as Pick<AuthCredentials, "email" | "password">)
    }
  />
);

export default SignIn;
