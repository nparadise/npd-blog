import { FetchCategoriesReturnType } from "@/app/lib/database";
import EditButton from "@/app/components/setting/category/CategoryEditButton";
import Link from "next/link";

interface Props {
  categoryList: FetchCategoriesReturnType[];
}

export default function CategoryList({ categoryList }: Props) {
  return (
    <section className="mt-1 grid grid-cols-4 items-stretch border-2 border-black">
      {/* head row */}
      <div className="border-b border-e border-black px-2 text-lg font-bold">
        Main Category
      </div>
      <div className="border-b border-e border-black px-2 text-lg font-bold">
        Sub Category
      </div>
      <div className="border-b border-e border-black px-2 text-lg font-bold">
        Edit
      </div>
      <div className="border-b border-black px-2 text-lg font-bold">Delete</div>
      {/* category lists */}
      {categoryList.map((main) => {
        if (main.isDeleted) return null;

        return (
          <>
            <MainRow name={main.name} id={main.id} key={main.name} />
            {main.children.map((sub) => {
              if (sub.isDeleted) return null;

              return (
                <SubRow
                  name={sub.name}
                  id={sub.id}
                  parentId={main.id}
                  key={sub.name}
                />
              );
            })}
          </>
        );
      })}
    </section>
  );
}

function MainRow({ name, id }: { name: string; id: number }) {
  return (
    <>
      <div className="flex items-center border-e border-t border-black px-2">
        {name}
      </div>
      <div className="flex items-center border-e border-t border-black px-2"></div>
      <div className="border-e border-t border-black px-2">
        <EditButton target="main" data={{ name: name, id: id }} />
      </div>
      <div className="border-t border-black px-2">
        <DeleteButton target="main" data={{ name: name, id: id }} />
      </div>
    </>
  );
}

function SubRow({
  name,
  id,
  parentId,
}: {
  name: string;
  id: number;
  parentId: number;
}) {
  return (
    <>
      <div className="flex items-center border-e border-black px-2"></div>
      <div className="flex items-center border-e border-black px-2">{name}</div>
      <div className="border-e border-black px-2">
        <EditButton
          target="sub"
          data={{ name: name, id: id, parentId: parentId }}
        />
      </div>
      <div className="border-black px-2">
        <DeleteButton target="sub" data={{ name: name, id: id }} />
      </div>
    </>
  );
}

function DeleteButton({
  target,
  data,
}: {
  target: "main" | "sub";
  data: { name: string; id: number };
}) {
  const query =
    target === "main"
      ? { delete: "true", target: target, name: data.name, id: data.id }
      : { delete: "true", target: target, name: data.name, id: data.id };

  return (
    <Link
      href={{ pathname: "/setting/category", query: query }}
      className="alert-button block"
    >
      삭제
    </Link>
  );
}
