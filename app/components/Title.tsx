import Link from "next/link";

interface Props {
  main: string | { name: string; url: string };
  sub?: string | { name: string; url: string };
}

export default function Title({ main, sub }: Props) {
  const mainName = typeof main === "string" ? main : main.name;
  const mainUrl = typeof main === "string" ? `/${encodeURI(main)}` : main.url;
  const subName = sub ? (typeof sub === "string" ? sub : sub.name) : "";
  const subUrl = sub
    ? typeof sub === "string"
      ? `/${encodeURI(mainName)}?subCategory=${encodeURI(sub)}`
      : sub.url
    : "";

  return (
    <h2 className="mx-1 my-1 block rounded-md ps-1 text-2xl font-bold before:me-1 before:bg-blue-400 before:px-1 before:content-[''] md:mx-0">
      <Link href={mainUrl} className="underline-offset-4 hover:underline">
        {mainName}
      </Link>{" "}
      {typeof main === "string" ? "게시판" : ""}{" "}
      {sub ? (
        <>
          -{" "}
          <Link href={subUrl} className="underline-offset-4 hover:underline">
            {subName}
          </Link>
        </>
      ) : null}
    </h2>
  );
}
