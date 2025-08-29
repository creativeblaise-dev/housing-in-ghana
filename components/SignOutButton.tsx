"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();

  return (
    <form
      action={async (): Promise<void> => {
        await authClient.signOut();
        router.push("/"); //   Redirect to home or login page after sign-out
      }}
    >
      <Button className="mt-6 bg-[#121111] cursor-pointer hover:bg-red-500">
        Log out
      </Button>
    </form>
  );
};

export default SignOutButton;
