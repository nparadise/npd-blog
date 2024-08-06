import { PropsWithAttributes } from "@/app/lib/slateTypes";
import { CustomText as CustomTextType } from "@/app/lib/slateTypes";
import clsx from "clsx";

export default function Leaf(props: PropsWithAttributes & { leaf?: CustomTextType }) {
  return (
    <span
      {...props.attributes}
      className={clsx({
        "font-bold": props.leaf?.bold,
        italic: props.leaf?.italic,
      })}
    >
      {props.children}
    </span>
  );
}
