import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { authenticate } from "@/app/lib/actions";
import LoginForm from "@/app/components/login/LoginForm";

export const metadata: Metadata = {
  title: "Login | NPD Blog",
};

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

export default async function LoginPage({ searchParams }: Props) {
  const session = await auth();
  if (!!session?.user) redirect("/");

  const boundAuthenticate = (async (
    callbackUrl: string,
    prevState: string | undefined,
    formData: FormData,
  ) => {
    "use server";
    return await authenticate(prevState, formData, callbackUrl);
  }).bind(null, searchParams.callbackUrl ?? "/");

  return (
    <div className="flex h-full items-center justify-center">
      <LoginForm action={boundAuthenticate} />
    </div>
  );
}
