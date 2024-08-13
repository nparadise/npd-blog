import { FetchCategoriesReturnType } from "@/app/lib/database";
import EditButton from "./CategoryEditButton";
import Link from "next/link";

interface Props {
  categoryList: FetchCategoriesReturnType[];
}

export default function DeletedCategoryList({ categoryList }: Props) {
  return (
    <section className="mt-1 grid grid-cols-4 items-stretch border-2 border-black">
      {/* head row */}
      <div className="border-b border-r border-black px-2 text-lg font-bold">
        Main Category
      </div>
      <div className="border-b border-r border-black px-2 text-lg font-bold">
        Sub Category
      </div>
      <div className="border-b border-r border-black px-2 text-lg font-bold">
        Edit
      </div>
      <div className="border-b border-black px-2 text-lg font-bold">
        Restore
      </div>
      {/* category lists */}
      {categoryList.map((main) => {
        return (
          <>
            {main.isDeleted && (
              <MainRow name={main.name} id={main.id} key={main.name} />
            )}
            {main.children.map((sub) => {
              if (!sub.isDeleted) return null;

              return (
                <SubRow
                  name={sub.name}
                  id={sub.id}
                  parentName={main.name}
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
      <div className="flex items-center border-e border-t border-black ps-2">
        {name}
      </div>
      <div className="flex items-center border-e border-t border-black ps-2"></div>
      <div className="flex items-center border-e border-t border-black ps-2">
        <EditButton target="main" data={{ name: name, id: id }} />
      </div>
      <div className="flex items-center border-t border-black ps-2">
        <RecoverButton
          target="main"
          data={{ name: name, id: id }}
          mode="none"
          buttonText="메인 카테고리만"
        />
        <span className="inline-block w-2"></span>
        <RecoverButton
          target="main"
          data={{ name: name, id: id }}
          mode="includeSub"
          buttonText="하위 카테고리도"
        />
      </div>
    </>
  );
}

function SubRow({
  name,
  id,
  parentName,
  parentId,
}: {
  name: string;
  id: number;
  parentName: string;
  parentId: number;
}) {
  return (
    <>
      <div className="flex items-center border-e border-t border-black ps-2">
        {parentName}
      </div>
      <div className="flex items-center border-e border-t border-black ps-2">
        {name}
      </div>
      <div className="flex items-center border-e border-t border-black ps-2">
        <EditButton
          target="sub"
          data={{ id: id, name: name, parentId: parentId }}
        />
      </div>
      <div className="flex items-center border-t border-black ps-2">
        <RecoverButton
          target="sub"
          data={{ id: id, name: name }}
          buttonText="복구"
        />
      </div>
    </>
  );
}

function RecoverButton({
  target,
  data,
  mode = "none",
  buttonText,
}: {
  target: "main" | "sub";
  data: {
    name: string;
    id: number;
  };
  mode?: "includeSub" | "none";
  buttonText: string;
}) {
  return (
    <Link
      href={{
        pathname: "/setting/category",
        query: {
          recover: "true",
          target: target,
          name: data.name,
          id: data.id,
          includeSub: (mode === "includeSub").toString(),
        },
      }}
      className="main-button block"
      replace
    >
      {buttonText}
    </Link>
  );
}
