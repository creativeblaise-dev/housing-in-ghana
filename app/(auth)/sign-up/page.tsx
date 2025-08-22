"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";
import { AuthCredentials } from "@/types";

const SignUp = () => (
  <AuthForm
    type="SIGN_UP"
    formSchema={signUpSchema}
    defaultValues={{
      fullName: "",
      email: "",
      password: "",
      // businessCertificate: "",
    }}
    onSubmit={(data: Record<string, any>) => signUp(data as AuthCredentials)}
  />
);

export default SignUp;
