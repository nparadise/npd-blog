"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "./client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
  callbackUrl?: string,
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      redirectTo: callbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

const RegisterUser = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string(),
});

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  const validatedFields = RegisterUser.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("password-re"),
  });

  if (!validatedFields.success) {
    return "Missing Fields. Failed to Create Account";
  }

  const { email, password, confirmPassword } = validatedFields.data;

  if (password != confirmPassword) return "Passwords don't match.";

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log(email, hashedPassword);
    console.log(error);
    return "Database Error: Failed to Create Account";
  } finally {
    redirect("/login");
  }
}

export async function logout() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  } finally {
    redirect("/");
  }
}
