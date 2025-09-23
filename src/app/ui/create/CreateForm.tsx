"use client";

import { useActionState } from "react";
import Form from "next/form";

// --- actions ---
import { createGall } from "@/app/lib/actions/gall";

// --- UI ---
import { FormInput, FormMsg, FormSubmitButton } from "../common/FormUi";

export default function CreateForm() {
  const [msg, formAction, pending] = useActionState(createGall, null);

  return (
    <Form action={formAction} className="px-2 space-y-4">
      <FormInput
        label="갤러리 이름 (한글만 가능해요)"
        type="text"
        name="gallName"
        placeholder="예: 고양이"
      />

      <FormInput
        label="갤러리 주소 (영문 약어)"
        type="text"
        name="abbr"
        placeholder="예: cat"
      />

      {msg && <FormMsg msg={msg} />}

      <FormSubmitButton label="갤러리 생성" isPending={pending} />
    </Form>
  );
}
