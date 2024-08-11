import Title from "@/app/components/Title";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: '설정'
}

export default function SettingPage() {
  return (
    <>
      <Title main={{ name: "설정", url: "/setting" }} />
      <div className="flex flex-wrap">
        <Link
          href="/setting/category"
          className="h-32 w-40 rounded-sm bg-blue-300 text-center text-lg font-bold leading-[126px]"
        >
          카테고리 설정
        </Link>
      </div>
    </>
  );
}
