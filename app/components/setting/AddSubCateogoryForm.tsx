"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import { addSubCategory } from "@/app/lib/actions";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function AddSubCategoryForm({
  mainCategoryList,
}: {
  mainCategoryList: { name: string; id: number }[];
}) {
  const [errorMessage, dispatch] = useFormState(addSubCategory, undefined);

  return (
    <ModalWrapper>
      <form
        action={dispatch}
        className="w-60 rounded-lg bg-white py-10 text-center"
      >
        <label htmlFor="name-input" className="block">
          이름
          <input
            type="text"
            name="name"
            id="name-input"
            className="m-1 rounded-sm border border-gray-800 p-1"
            placeholder="이름"
            required
          />
        </label>
        <label htmlFor="mainCategory-select" className="block">
          상위
          <select
            name="mainCategory"
            id="mainCategory-select"
            className="m-1 rounded-sm border border-gray-800 p-1"
          >
            {mainCategoryList.map((main) => {
              return (
                <option value={main.id} key={main.name}>
                  {main.name}
                </option>
              );
            })}
          </select>
        </label>
        <div className="text-red-600">{errorMessage ?? null}</div>
        <button type="submit" className="main-button">
          추가
        </button>
        <Link
          href="/setting/category"
          replace={true}
          className="alert-button ms-2 inline-block"
        >
          취소
        </Link>
      </form>
    </ModalWrapper>
  );
}
