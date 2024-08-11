"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "./client";
import { redirect } from "next/navigation";
import {
  createMainCategory,
  createSubCategory,
  updateMainCategory as updateMainInDB,
  updateSubCategory as updateSubInDB,
} from "./database";

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

export async function addMainCategory(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const name = formData.get("name");
    if (!name) return "No Input";

    const res = await prisma.mainCategory.findUnique({
      where: { name: name as string },
    });
    if (res) return "Main Category already exists";

    await createMainCategory(name as string);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    redirect("/setting/category");
  }
}

export async function addSubCategory(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const name = formData.get("name") as string;
    const mainCategoryId = formData.get("mainCategory") as string;
    if (!name) return "No name input";
    if (!mainCategoryId) return "Something gone wrong";

    const res = await prisma.subCategory.findFirst({
      where: {
        name: name,
        mainCategoryId: parseInt(mainCategoryId),
      },
    });
    if (res) return "Sub Category already exists";

    await createSubCategory(name, parseInt(mainCategoryId));
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    redirect("/setting/category");
  }
}

export async function updateMainCategory(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const name = formData.get("name") as string;
    const id = formData.get("id") as string;
    if (!name) return "No Input";

    const res = await prisma.mainCategory.findUnique({
      where: { name: name },
    });
    if (res) return "Same main category name already exists";

    await updateMainInDB(parseInt(id), name);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    redirect("/setting/category");
  }
}

export async function updateSubCategory(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const name = formData.get("name") as string;
    const id = parseInt(formData.get("id") as string);
    const parentId = parseInt(formData.get("mainCategory") as string);
    if (!name) return "No name input";

    const res = await prisma.subCategory.findFirst({
      where: {
        name: name,
        mainCategoryId: parentId,
      },
    });
    if (res)
      return "Same sub category name already exists in this main category";

    await updateSubInDB(id, name, parentId);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    redirect("/setting/category");
  }
}
