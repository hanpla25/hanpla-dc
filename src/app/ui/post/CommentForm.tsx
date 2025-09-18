"use client";

import Form from "next/form";

// --- UI ---
import { FormInput, FormSubmitButton } from "../common/FormUi";

// --- Types ---

type Props = {
  postId: number;
  onSubmit: (formData: FormData) => Promise<void>;
  parentId?: number | null;
};

export default function CommentForm({ postId, onSubmit, parentId }: Props) {
  return (
    <Form
      action=""
      onSubmit={async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        await onSubmit(formData);

        const textarea = form.querySelector<HTMLTextAreaElement>(
          "textarea[name=content]"
        );
        if (textarea) textarea.value = "";
      }}
      className="mx-2 mt-1 px-2 py-6 border border-neutral-300 rounded-md space-y-4"
    >
      <div className="flex gap-2 w-full">
        <FormInput
          type="text"
          name="nickname"
          placeholder="닉네임"
          defaultValue="ㅇㅇ"
          minLength={2}
          maxLength={8}
          className="flex-1"
        />
        <FormInput
          type="password"
          name="password"
          placeholder="비밀번호"
          minLength={2}
          maxLength={20}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          className="flex-1"
        />
      </div>
      <textarea
        name="content"
        placeholder="댓글을 입력해주세요."
        required
        minLength={1}
        maxLength={500}
        className="w-full h-32 p-2 border border-neutral-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-neutral-400"
      />

      <input type="hidden" name="postId" defaultValue={postId} />
      {parentId && (
        <input type="hidden" name="parentId" defaultValue={parentId} />
      )}

      <div className="mt-3 flex justify-end">
        <FormSubmitButton label="작성" isPending={false} />
      </div>
    </Form>
  );
}
