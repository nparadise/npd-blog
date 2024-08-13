import { Post, PostWithSubCategory } from "@/app/lib/types";
import Link from "next/link";

interface Props {
  posts: PostWithSubCategory[] | Post[];
}

export default function PostList({ posts }: Props) {
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center">
        이제 채워볼 시간이에요.
      </div>
    );
  }

  return (
    <>
      <ul>
        {posts.map((post) => (
          <li
            key={`post-${post.id}`}
            className="mx-1 my-1 block rounded-sm bg-blue-200 px-2 py-1"
          >
            <Link
              href={`/post/${post.id}`}
              className="block w-full overflow-hidden overflow-ellipsis text-nowrap text-lg font-bold leading-tight hover:underline hover:underline-offset-4"
            >
              {post.title}
            </Link>
            {"subCategoryName" in post ? (
              <span className="inline-block text-sm leading-tight me-1">{post.subCategoryName} - </span>
            ) : null}
            <time className="inline-block text-sm leading-tight">
              {post.createdAt.toLocaleString()}
            </time>
          </li>
        ))}
      </ul>
    </>
  );
}
