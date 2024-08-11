import AddMainCategoryForm from "@/app/components/setting/category/AddMainCategoryForm";
import AddSubCategoryForm from "@/app/components/setting/category/AddSubCateogoryForm";
import EditMainCategoryForm from "@/app/components/setting/category/EditMainCategoryForm";
import EditSubCategoryForm from "@/app/components/setting/category/EditSubCategoryForm";
import Title from "@/app/components/Title";
import { fetchCategories } from "@/app/lib/database";
import { Metadata } from "next";
import Link from "next/link";

interface Props {
  searchParams: {
    addMain: string;
    addSub: string;
    editMain: string;
    editSub: string;
    delete: string;
    mainId: string;
    subId: string;
    name: string;
  };
}

export const metadata: Metadata = {
  title: "카테고리 설정",
};

export default async function Page({ searchParams }: Props) {
  const categoryList = await fetchCategories();
  const mainCategoryList = categoryList.map((main) => {
    return {
      name: main.name,
      id: main.id,
    };
  });

  return (
    <>
      <Title
        main={{ name: "설정", url: "/setting" }}
        sub={{ name: "카테고리", url: "/setting/category" }}
      />
      {/* Buttons */}
      <div>
        <Link
          href={{ pathname: "/setting/category", query: { addMain: "true" } }}
          className="main-button inline-block"
          replace
        >
          주 카테고리 추가
        </Link>
        <Link
          href={{ pathname: "/setting/category", query: { addSub: "true" } }}
          className="main-button ml-1 inline-block"
          replace
        >
          하위 카테고리 추가
        </Link>
      </div>
      <section className="mt-1 grid grid-cols-4 items-stretch border-2 border-black">
        {/* head row */}
        <div className="border-b-2 border-black px-2 text-lg font-bold">
          Main Category
        </div>
        <div className="border-b-2 border-black px-2 text-lg font-bold">
          Sub Category
        </div>
        <div className="border-b-2 border-black px-2 text-lg font-bold">
          Edit
        </div>
        <div className="border-b-2 border-black px-2 text-lg font-bold">
          Delete
        </div>
        {/* category lists */}
        {categoryList.map((main) => {
          return (
            <>
              <MainRow name={main.name} id={main.id} key={main.name} />
              {main.children.map((sub) => {
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
      {searchParams.addMain === "true" && <AddMainCategoryForm />}
      {searchParams.addSub === "true" && (
        <AddSubCategoryForm mainCategoryList={mainCategoryList} />
      )}
      {searchParams.editMain === "true" && (
        <EditMainCategoryForm
          id={searchParams.mainId}
          name={searchParams.name}
        />
      )}
      {searchParams.editSub === "true" && (
        <EditSubCategoryForm
          mainCategoryList={mainCategoryList}
          subCategory={{
            id: searchParams.subId,
            name: searchParams.name,
            parentId: searchParams.mainId,
          }}
        />
      )}
    </>
  );
}

function MainRow({ name, id }: { name: string; id: number }) {
  return (
    <>
      <div className="border-r border-t border-black px-2">{name}</div>
      <div className="border-r border-t border-black px-2"></div>
      <div className="border-t border-black px-2">
        <EditButton category="main" data={{ name: name, id: id }} />
      </div>
      <div className="border-t border-black px-2">
        <DeleteButton />
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
      <div className="border-r border-black px-2"></div>
      <div className="border-r border-black px-2">{name}</div>
      <div className="px-2">
        <EditButton
          category="sub"
          data={{ name: name, id: id, parentId: parentId }}
        />
      </div>
      <div className="px-2">
        <DeleteButton />
      </div>
    </>
  );
}

function EditButton({
  category,
  data,
}: {
  category: "main" | "sub";
  data: { name: string; id: number; parentId?: number };
}) {
  const query =
    category === "main"
      ? { editMain: "true", mainId: data.id.toString(), name: data.name }
      : {
          editSub: "true",
          mainId: data.parentId?.toString(),
          subId: data.id.toString(),
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

function DeleteButton() {
  return (
    <Link href="" className="alert-button block">
      삭제
    </Link>
  );
}
