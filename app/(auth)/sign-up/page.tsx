"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";
import { AuthCredentials } from "@/types";
import { signUpUser } from "@/server/actions/users";

const SignUp = () => (
  <AuthForm
    type="SIGN_UP"
    formSchema={signUpSchema}
    defaultValues={{
      name: "",
      email: "",
      password: "",
      // businessCertificate: "",
    }}
    onSubmit={(data: Record<string, any>) =>
      signUpUser(data as AuthCredentials)
    }
  />
);

export default SignUp;
