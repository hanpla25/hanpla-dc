import { useRef, useState } from "react";
import Link from "next/link";

// --- Hooks ---
import useOnClickOutside from "@/app/hooks/useOnClickOutside";
import { GallMeta } from "@/app/lib/type/gallType";
import normalize from "@/app/utils/normalize";

const Input = ({
  setQuery,
}: {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
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
};

const Result = ({
  allGallList,
  query,
}: {
  allGallList: GallMeta[];
  query: string;
}) => {
  if (query.length === 0) return;

  const normalizedQuery = normalize(query);

  const result = allGallList.filter((gall) =>
    normalize(gall.name).includes(normalizedQuery)
  );

  return (
    <ul>
      {result.map((item) => (
        <li key={item.abbr} className="p-1 hover:bg-neutral-100 cursor-pointer">
          <Link href={`/${item.abbr}`} className="block">
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default function SearchModal({
  onOutsideClick,
  allGallList,
}: {
  onOutsideClick: () => void;
  allGallList: GallMeta[];
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");

  useOnClickOutside(modalRef, () => onOutsideClick());

  return (
    <div
      ref={modalRef}
      className="absolute right-0 w-full md:w-auto border border-neutral-200 shadow-md bg-white p-2 rounded-md z-50"
    >
      <Input setQuery={setQuery} />
      <Result allGallList={allGallList} query={query} />
    </div>
  );
}
