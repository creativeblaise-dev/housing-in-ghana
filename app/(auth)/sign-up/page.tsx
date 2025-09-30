"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";

const SignUp = () => (
  <AuthForm
    type="SIGN_UP"
    formSchema={signUpSchema}
    defaultValues={{
      name: "",
      email: "",
      password: "",
    }}
  />
);

export default SignUp;
