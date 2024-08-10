import {
  fetchCategoryPostCount,
  fetchCategoryPostList,
} from "@/app/lib/database";
import PostList from "@/app/components/PostList";
import Pagination from "@/app/components/Pagination";
import Title from "@/app/components/Title";
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
      <Title main={main} sub={sub} />
      <PostList posts={posts} />
      <Pagination pages={pageCount} currentPage={currentPage} />
      <div className="mx-1 flex justify-end">
        <Link href="/create" type="button" className="main-button">
          쓰기
        </Link>
      </div>
    </>
  );
}
