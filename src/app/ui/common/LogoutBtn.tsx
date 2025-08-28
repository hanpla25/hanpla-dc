"use client";

import Form from "next/form";

// --- actions ---
import { signout } from "@/app/lib/actions/auth-actions";

export default function SignoutButton({ className }: { className?: string }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!confirm("로그아웃 할까요?")) {
      e.preventDefault();
    }
  };

  return (
    <Form action={signout} onSubmit={handleSubmit}>
      <button type="submit" className={`cursor-pointer text-left ${className}`}>
        로그아웃
      </button>
    </Form>
  );
}
