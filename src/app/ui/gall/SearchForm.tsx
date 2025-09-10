"use client";

import { useSearchParams } from "next/navigation";
import Form from "next/form";

const style = "border border-neutral-300 rounded-sm outline-none";

function Select({ option }: { option: string }) {
  return (
    <select name="option" id="option" className={style} defaultValue={option}>
      <option value="title">제목</option>
      <option value="nickname">닉네임</option>
    </select>
  );
}

function Input({ search, mode }: { search: string; mode: string | null }) {
  return (
    <>
      <label htmlFor="search" className="sr-only">
        검색
      </label>
      <input
        type="text"
        id="search"
        name="search"
        defaultValue={search}
        className={`${style} flex-1 min-w-0`}
      />
      {!!mode && (
        <input type="hidden" id="mode" name="mode" defaultValue="popular" />
      )}
    </>
  );
}

function Button() {
  return (
    <button type="submit" className={`${style} px-4 cursor-pointer`}>
      검색
    </button>
  );
}

export default function SearchForm({ abbr }: { abbr: string }) {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const option = searchParams.get("option") ?? "title";
  const mode = searchParams.get("mode");

  const handleSubmit = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="flex justify-center mb-2 px-2">
      <Form
        action={`/${abbr}`}
        onSubmit={handleSubmit}
        className="flex gap-1 w-full max-w-sm"
      >
        <Select option={option} />
        <Input search={search} mode={mode} />
        <Button />
      </Form>
    </div>
  );
}
