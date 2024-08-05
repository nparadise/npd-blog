import Link from "next/link";

interface Props {
  mainCategory: string;
  subCategory?: string;
}

export default function CategoryTitle({ mainCategory, subCategory }: Props) {
  return (
    <h2 className="mx-1 my-1 block rounded-md ps-1 text-2xl font-bold before:me-1 before:bg-blue-400 before:px-1 before:content-[''] md:mx-0">
      <Link
        href={`/${mainCategory}`}
        className="underline-offset-4 hover:underline"
      >
        {mainCategory}
      </Link>{" "}
      게시판{" "}
      {subCategory ? (
        <>
          -{" "}
          <Link
            href={`/${encodeURI(mainCategory)}?subCategory=${encodeURI(subCategory)}`}
            className="underline-offset-4 hover:underline"
          >
            {subCategory}
          </Link>
        </>
      ) : null}
    </h2>
  );
}
