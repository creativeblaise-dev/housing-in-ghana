import { Button } from "./ui/button";
import { signOut } from "@/auth";

const SignOutButton = () => {
  return (
    <form
      action={async (): Promise<void> => {
        "use server";
        await signOut();
      }}
    >
      <Button className="mt-6 bg-[#121111] cursor-pointer hover:bg-red-500">
        Log out
      </Button>
    </form>
  );
};

export default SignOutButton;
