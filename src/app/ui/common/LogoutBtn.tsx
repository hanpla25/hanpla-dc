"use client";

import Form from "next/form";

// --- Actions ---

export default function LogoutBtn({ className }: { className?: string }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!confirm("로그아웃 할까요?")) {
      e.preventDefault();
    }
  };

  return (
    <Form action={""} onSubmit={handleSubmit}>
      <button type="submit" className={className}>
        로그아웃
      </button>
    </Form>
  );
}
