import { fetchCategories } from "@/app/lib/database";
import Link from "next/link";
import NavListItem from "./NavListItem";

export default async function Navigation() {
  const categories = await fetchCategories();

  return (
    <>
      {categories.map(({ name: mainCategory, children }) => {
        if (children.length === 0) return null;

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
              {children.map(({ name: subCategory }) => (
                <NavListItem
                  key={`link-sub-${subCategory}`}
                  href={`/${encodeURI(mainCategory)}?subCategory=${encodeURI(subCategory)}`}
                >
                  {subCategory}
                </NavListItem>
              ))}
            </ul>
          </>
        );
      })}
    </>
  );
}
