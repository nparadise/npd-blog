import Title from "@/app/components/Title";
import DeleteForm from "@/app/components/DeleteForm";
import MarkdownView from "@/app/components/MarkdownView";
import { fetchPostById } from "@/app/lib/database";
import Link from "next/link";
import { Metadata } from "next";

interface Params {
  params: { postId: string };
  searchParams: { delete: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const title = await fetchPostById(parseInt(params.postId)).then(
    (v) => v.post.title,
  );
  return { title: title };
}

export default async function PostPage({ params, searchParams }: Params) {
  const { post, mainCategory, subCategory } = await fetchPostById(
    parseInt(params.postId),
  );

  const showDeleteForm: boolean = searchParams.delete === "true";

  return (
    <>
      <Title main={mainCategory} sub={subCategory} />
      <header className="mx-2 md:mx-1">
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

      <article
        data-color-mode="light"
        className="preview m-2 break-words rounded-sm border-2 border-blue-300 p-4 md:mx-1"
      >
        <MarkdownView content={post.content} />
      </article>

      <div className="mx-2 flex justify-end gap-2 md:mx-1">
        <Link href={`/edit/${params.postId}`} className="main-button">
          수정
        </Link>
        <Link
          href={`/post/${params.postId}?delete=true`}
          className="alert-button"
        >
          삭제
        </Link>
      </div>
      {/* TODO: 댓글 기능 들어갈 자리 */}
      {showDeleteForm && <DeleteForm postId={post.id.toString()} />}
    </>
  );
}
