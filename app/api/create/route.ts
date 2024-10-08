import { createPost } from "@/app/lib/database";
import { PostForCreate } from "@/app/lib/types";
import { getSession } from "next-auth/react";

export async function POST(request: Request) {
  const session = getSession();
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
    dbRes = await createPost(
      req.title,
      req.content,
      parseInt(req.subCategoryId),
    );
  } catch (error) {
    return new Response(`Database Error: ${error}`, { status: 400 });
  }

  return Response.json({ dbRes });
}
