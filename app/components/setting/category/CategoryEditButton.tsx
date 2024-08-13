import Link from "next/link";

export default function CategoryEditButton({
  target,
  data,
}: {
  target: "main" | "sub";
  data: { name: string; id: number; parentId?: number };
}) {
  const query =
    target === "main"
      ? {
          edit: "true",
          target: "main",
          id: data.id.toString(),
          name: data.name,
        }
      : {
          edit: "true",
          target: "sub",
          mainId: data.parentId?.toString(),
          id: data.id.toString(),
          name: data.name,
        };

  return (
    <Link
      href={{ pathname: "/setting/category", query: query }}
      className="main-button block"
    >
      수정
    </Link>
  );
}
