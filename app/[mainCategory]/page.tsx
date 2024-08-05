import {
  fetchCategoryPostCount,
  fetchCategoryPostList,
} from "@/app/lib/database";
import PostList from "@/app/components/PostList";
import Pagination from "@/app/components/Pagination";
import CategoryTitle from "@/app/components/CategoryTitle";

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
  const [posts, postCount] = await Promise.all([
    fetchCategoryPostList({ main, sub }, currentPage),
    fetchCategoryPostCount({ main, sub }),
  ]);
  const pageCount = Math.ceil(postCount / 10);

  return (
    <>
      <CategoryTitle mainCategory={main} subCategory={sub} />
      <PostList posts={posts} />
      <Pagination
        pages={pageCount}
        currentPage={currentPage}
      />
      <div className="mx-1 flex justify-end">
        <button
          type="button"
          className="rounded-sm bg-blue-400 px-2 py-1 text-white hover:bg-blue-600 active:bg-blue-800"
        >
          쓰기
        </button>
      </div>
    </>
  );
}
