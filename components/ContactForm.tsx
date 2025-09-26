import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ContactForm = () => {
  return (
    <Card className="w-full max-w-sm lg:absolute lg:top-80">
      <CardHeader>
        <CardTitle>Send a message</CardTitle>
        <CardDescription>
          Fill out the form below and a member of our team will get back to you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="font-bold text-md">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="font-bold text-md">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="font-bold text-md">
                Message
              </Label>
              <Textarea placeholder="Type your message here." />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-end gap-2">
        <Button
          type="submit"
          className=" w-1/2 bg-[#111111] cursor-pointer hover:bg-[#F6BB2A] hover:text-stone-900"
        >
          Send Message
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactForm;
