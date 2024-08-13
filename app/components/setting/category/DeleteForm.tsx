import ModalWrapper from "@/app/components/ModalWrapper";
import { deleteCategory } from "@/app/lib/actions";
import Link from "next/link";

interface Props {
  target: "main" | "sub";
  data: { name: string; id: string };
}

export default function DeleteForm({ target, data }: Props) {
  return (
    <ModalWrapper>
      <form
        action={deleteCategory}
        className="min-w-60 rounded-lg bg-white py-10 text-center"
      >
        <input type="hidden" name="target" value={target} />
        <input type="hidden" name="id" value={data.id} />
        <p className="mb-1">
          <strong>{data.name}</strong> 삭제하시겠습니까?
        </p>
        <button type="submit" className="alert-button">
          예
        </button>
        <Link
          href="/setting/category"
          className="main-button ms-1 inline-block"
          replace
        >
          아니오
        </Link>
      </form>
    </ModalWrapper>
  );
}
