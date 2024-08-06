import MarkdownEditor from "@/app/components/MarkdownEditor";
import { fetchPostById, updatePost } from "@/app/lib/database";
import { Post, PostForCreate } from "@/app/lib/types";
import { redirect } from "next/navigation";

interface Props {
  params: {
    postId: string;
  };
}
export default async function EditPage({ params }: Props) {
  const postId = parseInt(params.postId);
  const postData = await fetchPostById(postId);
  const postEditData: PostForCreate = {
    title: postData.post.title,
    content: postData.post.content,
    subCategoryId: postData.post.subCategoryId,
  };

  async function action(data: PostForCreate) {
    "use server";

    let redirectPath: string = "";

    try {
      await updatePost(
        postId,
        data.title,
        data.content,
        data.subCategoryId,
      );
      redirectPath = `/post/${postId}`;
    } catch (error) {
      redirectPath = "/";
      console.error(error);
      throw error;
    } finally {
      redirect(redirectPath);
    }
  }

  return (
    <div className="mx-2 mt-2 text-end md:mx-0" data-color-mode="light">
      <MarkdownEditor postData={postEditData} onSubmit={action} />
    </div>
  );
}
