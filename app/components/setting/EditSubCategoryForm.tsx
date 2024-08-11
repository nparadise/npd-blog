"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import { updateSubCategory } from "@/app/lib/actions";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function EditSubCategoryForm({
  mainCategoryList,
  subCategory,
}: {
  mainCategoryList: { name: string; id: number }[];
  subCategory: {
    name: string;
    id: string;
    parentId: string;
  };
}) {
  const [errorMessage, dispatch] = useFormState(updateSubCategory, undefined);

  return (
    <ModalWrapper>
      <form
        action={dispatch}
        className="w-60 rounded-lg bg-white py-10 text-center"
      >
        <input type="hidden" name="id" value={subCategory.id} />
        <label htmlFor="name-input" className="block">
          이름
          <input
            type="text"
            name="name"
            id="name-input"
            className="m-1 rounded-sm border border-gray-800 p-1"
            placeholder="이름"
            defaultValue={subCategory.name}
            required
          />
        </label>
        <label htmlFor="mainCategory-select" className="block">
          상위 카테고리
          <select
            name="mainCategory"
            id="mainCategory-select"
            className="m-1 rounded-sm border border-gray-800 p-1"
            defaultValue={subCategory.parentId}
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
          변경
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
