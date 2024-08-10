import {
  deletePost,
  fetchPostById,
  fetchSubCategoryById,
  updatePost,
} from "@/app/lib/database";
import { Post, PostForCreate } from "@/app/lib/types";
import { auth } from "@/auth";

export async function GET(
  request: Request,
  { params }: { params: { postId: string } },
) {
  console.log(request);
  const post = await fetchPostById(parseInt(params.postId));
  return Response.json({ post });
}

export async function POST(
  request: Request,
  { params }: { params: { postId: string } },
) {
  const session = await auth();

  if (!session) {
    return new Response(null, { status: 401 });
  }

  let req = await request.json();
  if (!(req as PostForCreate)) {
    return new Response(`POST body error`, { status: 400 });
  }
  req = req as PostForCreate;

  let dbRes;
  try {
    dbRes = await updatePost(
      parseInt(params.postId),
      req.title,
      req.content,
      parseInt(req.subCategoryId),
    );
  } catch (error) {
    return new Response(`Database Error: ${error}`, { status: 400 });
  }

  return Response.json({ dbRes }, { status: 201 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { postId: string } },
) {
  const session = await auth();
  if (!session) return new Response(null, { status: 401 });

  try {
    const dbRes: Post = await deletePost(parseInt(params.postId));
    const categories: { mainCategory: string; subCategory: string } =
      await fetchSubCategoryById(dbRes.subCategoryId);

    return Response.json({ categories });
  } catch (error) {
    return new Response(`Database Error: ${error}`, { status: 400 });
  }
}
