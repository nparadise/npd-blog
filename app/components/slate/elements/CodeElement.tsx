import { PropsWithAttributes } from "@/app/lib/slateTypes";

export default function CodeElement(props: PropsWithAttributes) {
  return (
    <pre {...props.attributes}>
      <code className="font-coding">{props.children}</code>
    </pre>
  );
}
