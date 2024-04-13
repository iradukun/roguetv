"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = ({ initVariant }: { initVariant: Variant }) => {
  const session = useSession();
  const router = useRouter();

  const [variant, setVariant] = useState<Variant>(initVariant);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") setVariant("REGISTER");
    else setVariant("LOGIN");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch((error) => toast.error("Something went wrong."))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials.");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("You are logged in.");
            router.push("/");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={initVariant === "LOGIN" ? "outline" : "default"}>
          {initVariant === "LOGIN" ? "Login" : "Sign up"}
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 dark:bg-gray-800 dark:text-gray-400">
        <h1 className="text-3xl font-bold">
          {variant === "REGISTER" ? "Create account" : "Login"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    name="first_name"
                    placeholder="Lee"
                    required={variant === "REGISTER"}
                    {...register}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    name="last_name"
                    placeholder="Robinson"
                    required={variant === "REGISTER"}
                    {...register}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="lee123"
                  required={variant === "REGISTER"}
                  {...register}
                />
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="m@example.com"
              required
              type="email"
              {...register}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              required
              type="password"
              {...register}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Button type="submit" disabled={isLoading}>
              {variant === "LOGIN" ? "Sign in" : "Sign up"}
            </Button>
          </div>
          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <p>
              {variant === "LOGIN"
                ? "Do not have an account?"
                : "Already have an account?"}
            </p>

            <a onClick={toggleVariant} className="underline cursor-pointer">
              {variant === "LOGIN" ? "Create an account" : "Log in"}
            </a>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthForm;
