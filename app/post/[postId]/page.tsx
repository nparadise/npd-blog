import CategoryTitle from "@/app/components/CategoryTitle";
import { fetchPostById } from "@/app/lib/database";

export default async function PostPage({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const { post, mainCategory, subCategory } = await fetchPostById(
    parseInt(params.postId),
  );

  return (
    <>
      <CategoryTitle mainCategory={mainCategory} subCategory={subCategory} />
      <header className="sticky mx-2 md:mx-1">
        <h1 className="inline text-xl font-bold">{post.title}</h1>
        <div className="text-sm">
          <time dateTime={post.createdAt.toLocaleString()}>
            {`작성일: ${post.createdAt.toLocaleString()}`}
          </time>
          {post.createdAt.toString() !== post.updatedAt.toString() ? (
            <time dateTime={post.updatedAt.toLocaleString()}>
              {` / 수정일: ${post.updatedAt.toLocaleString()}`}
            </time>
          ) : null}
        </div>
      </header>

      <article className="m-2 break-words rounded-sm border-2 border-blue-300 p-2 md:mx-1">
        {post.content}
      </article>
      {/* TODO: 블로그의 주인일 때 글 수정/삭제 기능이 들어갈 자리 */}
      <div className="mx-2 flex justify-end gap-2 md:mx-1">
        <button
          type="button"
          className="rounded-sm bg-blue-400 px-2 py-1 text-white hover:bg-blue-600 active:bg-blue-800"
        >
          수정
        </button>
        <button
          type="button"
          className="rounded-sm bg-red-400 px-2 py-1 text-white hover:bg-red-600 active:bg-red-800"
        >
          삭제
        </button>
      </div>
      {/* TODO: 댓글 기능 들어갈 자리 */}
    </>
  );
}
