"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";
import { AuthCredentials } from "@/types";
import { signIn } from "@/server/actions/users";

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
