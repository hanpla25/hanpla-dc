"use client";

import Form from "next/form";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

// --- Actions ---
import { signupAction } from "@/app/lib/actions/auth";

// --- UI ---
import { FormInput, FormMsg, FormSubmitButton } from "../common/FormUi";

// --- Types ---

const initState = { success: false, msg: "" };

export default function AuthForm() {
  const [state, formAction, pending] = useActionState(signupAction, initState);

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      alert("회원가입이 완료되었어요.");
      router.push("/login");
    }
  }, [state.success, router]);

  return (
    <Form action={formAction} className="mx-2 space-y-4">
      <FormInput
        label="닉네임 (한글 또는 영어 2자 이상 8자 이하)"
        type="text"
        id="nickname"
        name="nickname"
        minLength={2}
        maxLength={8}
        defaultValue={state.inputs?.nickname}
        placeholder="예시: 홍길동"
      />
      {state.filed === "nickname" && <FormMsg msg={state.msg} />}

      <FormInput
        label="아이디 (영어 또는 숫자 4자 이상 10자 이하)"
        type="text"
        id="id"
        name="id"
        minLength={4}
        maxLength={20}
        defaultValue={state.inputs?.id}
        placeholder="예시: qwer"
      />
      {state.filed === "id" && <FormMsg msg={state.msg} />}

      <FormInput
        label="비밀번호 (영어 또는 숫자 4자 이상 10자 이하)"
        type="password"
        id="password"
        name="password"
        minLength={4}
        maxLength={20}
        defaultValue={state.inputs?.password}
        placeholder="예시: 1234"
      />
      {state.filed === "password" && <FormMsg msg={state.msg} />}

      <FormSubmitButton label="회원가입" isPending={pending} />
    </Form>
  );
}
