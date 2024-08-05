import { URLSearchParams } from "url";

export function createCategoryUrl({
  main,
  sub,
  page,
}: {
  main: string;
  sub?: string;
  page?: number;
}) {
  const searchParams = new URLSearchParams();
  if (!!sub) searchParams.append("subCategory", sub);
  if (!!page) searchParams.append("page", page.toString());

  return `/${main}?${searchParams.toString()}`;
}
