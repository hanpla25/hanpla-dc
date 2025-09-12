import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

interface PostContentProps {
  content: object;
}

export default function Content({ content }: PostContentProps) {
  const reactElement = renderToReactElement({
    content,
    extensions: [StarterKit, Image],
  });

  return <div className="p-2">{reactElement}</div>;
}
