import ModalWrapper from "@/app/components/ModalWrapper";
import { recoverCategory } from "@/app/lib/actions";
import Link from "next/link";

interface Props {
  target: "main" | "sub";
  data: {
    name: string;
    id: string;
  };
  includeSub: "true" | "false";
}

export default function RecoverForm({
  target,
  data,
  includeSub,
}: Props) {
  return (
    <ModalWrapper>
      <form
        action={recoverCategory}
        className="min-w-60 rounded-lg bg-white px-4 py-10 text-center"
      >
        <input type="hidden" name="target" value={target} />
        <input type="hidden" name="id" value={data.id} />
        <input type="hidden" name="includeSub" value={includeSub} />
        <p className="mb-1">
          <strong>{data.name}</strong>을(를) 복구하시겠습니까?
        </p>
        <button type="submit" className="main-button">
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
