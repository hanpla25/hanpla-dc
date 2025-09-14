"use client";

import { useActionState, useState } from "react";
import { useParams } from "next/navigation";
import Form from "next/form";

// --- Actions ---
import { writeAction } from "@/app/lib/actions/post";

// --- UI ---
import { FormInput, FormMsg } from "../common/FormUi";
import Buttons from "./Buttons";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

// --- Types ---
import { JSONContent } from "@tiptap/react";

type Props = {
  gallName: string;
};

export default function WriteForm({ gallName }: Props) {
  const { abbr } = useParams();

  const [state, formAction, pending] = useActionState(writeAction, null);

  const [editorJson, setEditorJson] = useState<string>("");

  const handleEditorChange = (jsonContent: JSONContent) => {
    setEditorJson(JSON.stringify(jsonContent));
  };

  return (
    <Form action={formAction} className="px-2 space-y-3">
      <div className="flex items-center gap-4">
        <FormInput
          label="닉네임"
          type="text"
          name="nickname"
          placeholder="닉네임"
          defaultValue="ㅇㅇ"
          minLength={2}
          maxLength={10}
        />

        <FormInput
          label="비밀번호"
          type="password"
          name="password"
          placeholder="비밀번호"
          minLength={4}
          maxLength={20}
        />
      </div>

      <FormInput
        type="text"
        name="title"
        label="제목"
        placeholder="제목을 입력해주세요."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      />

      <div className="border border-neutral-300">
        <SimpleEditor onUpdate={handleEditorChange} />
      </div>

      <input type="hidden" name="content" id="content" value={editorJson} />
      <input type="hidden" name="abbr" id="abbr" value={abbr} />
      <input type="hidden" name="gallName" id="gallName" value={gallName} />

      {state?.success === false && <FormMsg msg={state.msg} />}
      <Buttons isPending={pending} />
    </Form>
  );
}
