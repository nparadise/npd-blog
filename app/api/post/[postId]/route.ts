import { fetchPostById, updatePost } from "@/app/lib/database";
import { PostForCreate } from "@/app/lib/types";

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

  return Response.json({ dbRes });
}
