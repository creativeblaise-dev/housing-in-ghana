"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const SignOutButton = ({
  buttonStyles,
  title,
  icon,
}: {
  buttonStyles?: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
    // window.location.href = "/sign-in";
  };

  return (
    <Button className={buttonStyles} onClick={handleSignOut}>
      <span>{icon}</span> {title}
    </Button>
  );
};

export default SignOutButton;
