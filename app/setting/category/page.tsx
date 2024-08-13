import AddMainCategoryForm from "@/app/components/setting/category/AddMainCategoryForm";
import AddSubCategoryForm from "@/app/components/setting/category/AddSubCateogoryForm";
import CategoryList from "@/app/components/setting/category/CategoryList";
import DeletedCategoryList from "@/app/components/setting/category/DeletedCategoryList";
import DeleteForm from "@/app/components/setting/category/DeleteForm";
import EditMainCategoryForm from "@/app/components/setting/category/EditMainCategoryForm";
import EditSubCategoryForm from "@/app/components/setting/category/EditSubCategoryForm";
import RecoverForm from "@/app/components/setting/category/RecoverForm";
import Title from "@/app/components/Title";
import { fetchCategories } from "@/app/lib/database";
import { Metadata } from "next";
import Link from "next/link";

interface Props {
  searchParams: {
    target: "main" | "sub";
    add: "true" | "false";
    edit: "true" | "false";
    delete: "true" | "false";
    recover: "true" | "false";
    includeSub: "true" | "false";
    mainId: string;
    id: string;
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
          href={{
            pathname: "/setting/category",
            query: { add: "true", target: "main" },
          }}
          className="main-button inline-block"
          replace
        >
          주 카테고리 추가
        </Link>
        <Link
          href={{
            pathname: "/setting/category",
            query: { add: "true", target: "sub" },
          }}
          className="main-button ml-1 inline-block"
          replace
        >
          하위 카테고리 추가
        </Link>
      </div>
      <CategoryList categoryList={categoryList} />
      <DeletedCategoryList categoryList={categoryList} />

      {/* Modals */}
      {searchParams.add === "true" && searchParams.target === "main" && (
        <AddMainCategoryForm />
      )}
      {searchParams.add === "true" && searchParams.target === "sub" && (
        <AddSubCategoryForm mainCategoryList={mainCategoryList} />
      )}
      {searchParams.edit === "true" && searchParams.target === "main" && (
        <EditMainCategoryForm
          id={searchParams.mainId}
          name={searchParams.name}
        />
      )}
      {searchParams.edit === "true" && searchParams.target === "sub" && (
        <EditSubCategoryForm
          mainCategoryList={mainCategoryList}
          subCategory={{
            id: searchParams.id,
            name: searchParams.name,
            parentId: searchParams.mainId,
          }}
        />
      )}
      {searchParams.delete === "true" && (
        <DeleteForm
          target={searchParams.target}
          data={{ id: searchParams.id, name: searchParams.name }}
        />
      )}
      {searchParams.recover === "true" && (
        <RecoverForm
          target={searchParams.target}
          data={{ id: searchParams.id, name: searchParams.name }}
          includeSub={searchParams.includeSub ?? "false"}
        />
      )}
    </>
  );
}
