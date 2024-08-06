import { PropsWithAttributes } from "@/app/lib/slateTypes";

export default function DefaultElement(props: PropsWithAttributes) {
  return <p {...props.attributes}>{props.children}</p>;
}