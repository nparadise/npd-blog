import { PropsWithChildren } from "react";
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

export type PropsWithAttributes = PropsWithChildren<{ attributes: object }>;

export type CustomEditor = BaseEditor & ReactEditor;

export type CodeElement = { type: "code"; children: CustomText[] };
export type ParagraphElement = { type: "paragraph"; children: CustomText[] };

export type CustomElement = CodeElement | ParagraphElement;
export type CustomText = { text: string, bold: boolean, italic: boolean };

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
