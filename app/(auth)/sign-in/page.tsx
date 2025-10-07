"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";

const SignIn = () => (
  <AuthForm
    type="SIGN_IN"
    formSchema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
    }}
  />
);

export default SignIn;
