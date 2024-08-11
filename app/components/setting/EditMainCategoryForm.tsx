"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import { updateMainCategory } from "@/app/lib/actions";
import Link from "next/link";
import { useFormState } from "react-dom";

interface Props {
  id: string;
  name: string;
}

export default function EditMainCategoryForm({ id, name }: Props) {
  const [errorMessage, dispatch] = useFormState(updateMainCategory, undefined);

  return (
    <ModalWrapper>
      <form
        action={dispatch}
        className="w-60 rounded-lg bg-white py-10 text-center"
      >
        <input type="hidden" name="id" value={id} />
        <label htmlFor="name-input">이름</label>
        <input
          type="text"
          name="name"
          id="name-input"
          className="m-1 rounded-sm border border-gray-800 p-1"
          placeholder="이름"
          defaultValue={name}
          required
        />
        <div className="text-red-600">{errorMessage}</div>
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
