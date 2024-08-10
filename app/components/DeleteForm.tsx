"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useCallback } from "react";
import { MainSubCategoryName } from "@/app/lib/types";

export default function DeleteForm({ postId }: { postId: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      fetch(`/api/post/${postId}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.status === 401) {
          router.push(`/login?callbackUrl=${encodeURI(pathname)}`);
        } else if (res.status === 200) {
          res.json().then((val: object) => {
            if ("categories" in val) {
              if (
                !(
                  "mainCategory" in (val.categories as object) &&
                  "subCategory" in (val.categories as object)
                )
              ) {
                throw new Error("Wrong response");
              }
              const categories = val.categories as MainSubCategoryName;
              router.replace(
                `/${categories.mainCategory}?subCategory=${categories.subCategory}`,
              );
              router.refresh();
            }
          });
        }
      });
    },
    [postId, router, pathname],
  );

  const handleClickNo = useCallback(() => {
    router.replace(pathname);
  }, [router, pathname]);

  return (
    <div className="fixed left-0 top-0 flex h-dvh w-dvw items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="w-60 rounded-sm bg-white py-6 text-center"
      >
        <h3 className="pb-2">정말 삭제하시겠습니까?</h3>
        <button
          type="submit"
          className="w-16 rounded-sm bg-blue-400 py-1 text-white hover:bg-blue-600 active:bg-blue-800"
        >
          예
        </button>
        <button
          type="button"
          className="ms-2 w-16 rounded-sm bg-blue-400 py-1 text-white hover:bg-blue-600 active:bg-blue-800"
          onClick={handleClickNo}
        >
          아니오
        </button>
      </form>
    </div>
  );
}
