import {
  fetchCategoryPostCount,
  fetchCategoryPostList,
} from "@/app/lib/database";
import PostList from "@/app/components/PostList";
import Pagination from "@/app/components/Pagination";
import CategoryTitle from "@/app/components/CategoryTitle";
import Link from "next/link";

interface Props {
  params: { mainCategory: string };
  searchParams: { subCategory?: string; page?: string };
}

export default async function CategoryPosts({ params, searchParams }: Props) {
  const main = decodeURI(params.mainCategory);
  const sub = searchParams.subCategory
    ? decodeURI(searchParams.subCategory)
    : undefined;
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const itemsPerPage = 15;
  const [posts, postCount] = await Promise.all([
    fetchCategoryPostList({ main, sub }, currentPage, itemsPerPage),
    fetchCategoryPostCount({ main, sub }),
  ]);
  const pageCount = Math.ceil(postCount / itemsPerPage);

  return (
    <>
      <CategoryTitle mainCategory={main} subCategory={sub} />
      <PostList posts={posts} />
      <Pagination pages={pageCount} currentPage={currentPage} />
      <div className="mx-1 flex justify-end">
        <Link
          href="/create"
          type="button"
          className="rounded-sm bg-blue-400 px-2 py-1 text-white hover:bg-blue-600 active:bg-blue-800"
        >
          쓰기
        </Link>
      </div>
    </>
  );
}
