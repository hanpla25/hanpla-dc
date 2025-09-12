"use client";

import Form from "next/form";

// --- UI ---
import { FormInput } from "../common/FormUi";
import Buttons from "./Buttons";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export default function WriteForm() {
  return (
    <Form action={""} className="px-2 space-y-3">
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
        <SimpleEditor />
      </div>

      <Buttons isPending={false} />
    </Form>
  );
}
