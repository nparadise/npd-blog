"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { PostForCreate } from "@/app/lib/types";
import CategoryInput from "./CategoryInput";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface Props {
  postData?: PostForCreate;
  onSubmit?: (data: PostForCreate) => Promise<any>;
}

export default function MarkdownEditor({ postData, onSubmit }: Props) {
  const [title, setTitle] = useState<string>(
    postData ? postData.title : "제목을 입력하세요.",
  );
  const [content, setContent] = useState<string>(
    postData ? postData.content : "내용을 입력하세요.",
  );
  const [subCategoryId, setSubCategoryId] = useState(
    postData ? postData.subCategoryId.toString() : "1",
  );

  const clickConfirmButtonHandler = useCallback(() => {
    if (onSubmit) {
      onSubmit({ title, content, subCategoryId: parseInt(subCategoryId) });
    }
  }, [onSubmit, title, content, subCategoryId]);

  return (
    <>
      <div className="grid grid-cols-[70px_1fr] grid-rows-2 gap-y-1 text-start md:flex md:items-center md:justify-start">
        <CategoryInput
          defaultValue={subCategoryId}
          onChange={(event) => {
            setSubCategoryId(event.currentTarget.value);
          }}
        />
        <label
          htmlFor="title-input"
          className="inline-block h-6 text-center align-middle md:ms-2"
        >
          제목
        </label>
        <input
          type="text"
          name="title"
          id="title-input"
          className="ms-1 h-6 grow border border-gray-400"
          value={title}
          onChange={(event) => {
            setTitle(event.currentTarget.value);
          }}
        />
      </div>
      <MDEditor
        value={content}
        onChange={(v) => setContent(!!v ? v : "")}
        minHeight={500}
        height={500}
        className="preview mt-2"
      />
      <button
        type="button"
        className="mt-1 rounded-sm bg-blue-400 px-2 py-1 text-white hover:bg-blue-600 active:bg-blue-800"
        onClick={clickConfirmButtonHandler}
      >
        확인
      </button>
    </>
  );
}
