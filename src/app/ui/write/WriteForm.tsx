"use client";

import { useActionState, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Form from "next/form";

// --- Actions ---
import { checkPasswordToPost, writeAction } from "@/app/lib/actions/post";

// --- UI ---
import { FormInput, FormMsg } from "../common/FormUi";
import Buttons from "./Buttons";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

// --- Types ---
import { JSONContent } from "@tiptap/react";
import { PostType } from "@/app/lib/types/post";

type Props = {
  postId?: number;
  postData?: PostType;
  nickname?: string;
  gallName: string;
};

export default function WriteForm({
  postId,
  postData,
  nickname,
  gallName,
}: Props) {
  const router = useRouter();
  const { abbr } = useParams();

  const [state, formAction, pending] = useActionState(writeAction, null);
  const [title, setTitle] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isModify, setIsModify] = useState("false");

  const [editorJson, setEditorJson] = useState<JSONContent | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (postId) {
        setTitle(postData?.title ?? "");
        setEditorJson(postData?.content ?? null);
        setIsModify("true");
      }
    }
    fetchPost();
  }, [abbr, postId]);

  const handleEditorChange = (jsonContent: JSONContent) => {
    setEditorJson(jsonContent);
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postId) return;

    const formData = new FormData(e.currentTarget);
    const result = await checkPasswordToPost(postId, formData);

    if (result.success) {
      setIsChecked(true);
    } else {
      setPasswordError(result.message || "비밀번호가 일치하지 않습니다.");
    }
  };

  if (postId && !isChecked) {
    if (postData?.isLogin === true) {
      setIsChecked(true);
    }

    return (
      <form onSubmit={handlePasswordSubmit} className="mx-2 space-y-2">
        <FormInput
          type="text"
          id="password"
          label="비밀번호를 입력해주세요."
          name="password"
          placeholder="비밀번호"
        />

        {passwordError && <p className="text-red-500">{passwordError}</p>}

        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors cursor-pointer"
          >
            취소
          </button>

          <button
            type="submit"
            className="px-3 py-1 bg-neutral-500 text-white rounded hover:bg-neutral-600 transition-colors cursor-pointer"
          >
            확인
          </button>
        </div>
      </form>
    );
  }

  return (
    <Form action={formAction} className="px-2 space-y-3">
      <div className="flex items-center gap-4">
        <FormInput
          id="nickname"
          label="닉네임"
          type="text"
          name="nickname"
          placeholder="닉네임"
          defaultValue={nickname || "ㅇㅇ"}
          readOnly={!!nickname}
          minLength={2}
          maxLength={10}
        />

        {!nickname && (
          <FormInput
            id="password"
            label="비밀번호"
            type="password"
            name="password"
            placeholder="비밀번호"
            minLength={4}
            maxLength={20}
          />
        )}
      </div>

      <FormInput
        id="title"
        type="text"
        name="title"
        label="제목"
        placeholder="제목을 입력해주세요."
        defaultValue={title}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      />

      <div className="border border-neutral-300">
        <SimpleEditor
          content={editorJson ?? undefined}
          onUpdate={handleEditorChange}
        />
      </div>

      <input
        type="hidden"
        name="content"
        value={editorJson ? JSON.stringify(editorJson) : ""}
      />
      <input type="hidden" name="abbr" value={abbr} />
      {postId && <input type="hidden" name="postId" value={postId} />}
      <input type="hidden" name="gallName" value={gallName} />
      <input type="hidden" name="isLogin" value={nickname ? "true" : "false"} />
      <input
        type="hidden"
        name="isModify"
        value={isModify ? "true" : "false"}
      />

      {state?.success === false && <FormMsg msg={state.msg} />}
      <Buttons isPending={pending} />
    </Form>
  );
}
