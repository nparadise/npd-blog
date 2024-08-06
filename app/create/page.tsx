import MarkdownEditor from "@/app/components/MarkdownEditor";
import { PostForCreate } from "@/app/lib/types";
import { createPost } from "@/app/lib/database";
import { redirect } from "next/navigation";

export default function CreatePage() {
  async function action(data: PostForCreate) {
    "use server";

    let redirectPath: string = "";

    try {
      const res = await createPost(
        data.title,
        data.content,
        data.subCategoryId,
      );
      redirectPath = `/post/${res.id.toString()}`;
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
      <MarkdownEditor onSubmit={action} />
    </div>
  );
}
