"use client";

import { useEffect, useState } from "react";
import { FetchCategoriesReturnType } from "@/app/lib/database";

interface Props {
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  defaultValue?: string;
}

export default function CategoryInput({ onChange, defaultValue }: Props) {
  const [categories, setCategories] = useState<FetchCategoriesReturnType[]>([]);

  useEffect(() => {
    fetch("/api/categories", { method: "GET" }).then((res) => {
      if (res.ok) {
        res.json().then((v) => {
          if ("categories" in v) {
            setCategories(v.categories as FetchCategoriesReturnType[]);
          }
        });
      }
    });
  }, []);

  return (
    <>
      <label htmlFor="category-input" className="text-center">
        카테고리
      </label>
      <select
        name="category"
        id="category-input"
        className="ms-1 h-6 border border-gray-400"
        onChange={onChange}
        defaultValue={defaultValue ?? '1'}
      >
        {categories.map((mainCategory) => {
          return mainCategory.children.map((subCategory) => {
            return (
              <option
                value={subCategory.id.toString()}
                key={`option-${mainCategory.name}-${subCategory.name}`}
              >
                {`${mainCategory.name}-${subCategory.name}`}
              </option>
            );
          });
        })}
      </select>
    </>
  );
}
