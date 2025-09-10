"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// --- Hooks ---
import useOnClickOutside from "@/app/hooks/useOnClickOutside";
import normalize from "@/app/utils/normalize";

// --- Types ---
import { GallMeta } from "@/app/lib/types/gall";

function Input({
  setQuery,
}: {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <input
      type="text"
      id="gall"
      name="gall"
      placeholder="전체 갤러리 검색"
      autoFocus
      onChange={(e) => setQuery(e.target.value)}
      className="w-full border border-neutral-200 outline-0 px-2 focus"
    />
  );
}

function Result({
  gallList,
  debouncedQuery,
}: {
  gallList: GallMeta[];
  debouncedQuery: string;
}) {
  if (debouncedQuery.length === 0) return null;

  const normalizedQuery = normalize(debouncedQuery);

  const result = gallList.filter((gall) =>
    normalize(gall.name).includes(normalizedQuery)
  );

  if (result.length === 0) return <div className="p-1">갤러리가 없어요.</div>;

  return (
    <>
      {result.map((item) => (
        <Link
          key={item.abbr}
          href={`/${item.abbr}`}
          className="block p-1 hover:bg-neutral-100"
        >
          {item.name}
        </Link>
      ))}
    </>
  );
}

export default function Modal({
  gallList,
  onOutsideClick,
}: {
  gallList: GallMeta[];
  onOutsideClick: () => void;
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, () => onOutsideClick());

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 어두운 배경 (Overlay) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 모달 본체 */}
      <div
        ref={modalRef}
        className="relative bg-white border border-neutral-200 shadow-lg rounded-md p-4 w-80 bottom-20"
      >
        <Input setQuery={setQuery} />
        <Result gallList={gallList} debouncedQuery={debouncedQuery} />
      </div>
    </div>
  );
}
