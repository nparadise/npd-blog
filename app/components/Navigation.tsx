import { fetchCategories } from "@/app/lib/database";
import Link from "next/link";
import NavListItem from "./NavListItem";

export default async function Navigation() {
  const categories = await fetchCategories();

  return (
    <>
      {categories.map(({ name: mainCategory, isDeleted, children }) => {
        if (children.length === 0) return null;
        if (isDeleted) return null;
        if (children.filter((v) => !v.isDeleted).length === 0) return null;

        return (
          <>
            <h5
              key={`link-main-${mainCategory}`}
              className="pt-3 text-lg font-bold first:pt-0"
            >
              <Link
                href={`/${encodeURI(mainCategory)}`}
                className="hover:underline hover:underline-offset-4"
              >
                {mainCategory}
              </Link>
            </h5>
            <ul>
              {children.map(({ name: subCategory, isDeleted }) => {
                if (isDeleted) return null;
                return (
                  <NavListItem
                    key={`link-sub-${subCategory}`}
                    href={{
                      pathname: `/${encodeURI(mainCategory)}`,
                      query: { subCategory: encodeURI(subCategory) },
                    }}
                  >
                    {subCategory}
                  </NavListItem>
                );
              })}
            </ul>
          </>
        );
      })}
    </>
  );
}
