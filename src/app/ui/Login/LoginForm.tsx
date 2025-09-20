"use client";

import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

// --- Actions ---
import { loginAction } from "@/app/lib/actions/auth";

// --- UI ---
import { FormInput, FormMsg, FormSubmitButton } from "../common/FormUi";

export default function LoginForm() {
  const [msg, formAction, pending] = useActionState(loginAction, null);
  const searchParams = useSearchParams();

  return (
    <Form action={formAction} className="mx-2 space-y-4">
      <FormInput
        label="아이디"
        type="text"
        id="id"
        name="id"
        minLength={4}
        maxLength={20}
        placeholder="아이디를 입력해주세요."
      />

      <FormInput
        label="비밀번호"
        type="password"
        id="password"
        name="password"
        minLength={4}
        maxLength={20}
        placeholder="비밀번호를 입력해주세요."
      />

      <input
        type="hidden"
        name="callbackUrl"
        value={searchParams.get("callbackUrl") ?? "/"}
      />

      <FormSubmitButton label="로그인" isPending={pending} />
      {msg && <FormMsg msg={msg} />}
    </Form>
  );
}
