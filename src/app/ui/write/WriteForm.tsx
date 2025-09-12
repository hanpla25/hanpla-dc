"use client";

import { useActionState, useState } from "react";
import Form from "next/form";

// --- Actions ---
import { writeAction } from "@/app/lib/actions/post";

// --- UI ---
import { FormInput, FormMsg } from "../common/FormUi";
import Buttons from "./Buttons";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

// --- Types ---
import { JSONContent } from "@tiptap/react";

export default function WriteForm() {
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
          name="name"
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
      />

      <div className="border border-neutral-300">
        <SimpleEditor onUpdate={handleEditorChange} />
      </div>

      <input type="hidden" name="content" id="content" value={editorJson} />

      <Buttons isPending={pending} />
      {state?.success === false && <FormMsg msg={state.msg} />}
    </Form>
  );
}
