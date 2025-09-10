"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// --- UI ---
import SearchIcon from "./SearchIcon";
import Modal from "./Modal";

// --- Types ---
import { GallMeta } from "@/app/lib/types/gall";

type Props = {
  gallList: GallMeta[];
};

export default function Search({ gallList }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const closeModalClick = () => setIsOpen(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {isOpen && <Modal gallList={gallList} onOutsideClick={closeModalClick} />}
      <SearchIcon onClick={() => setIsOpen((prev) => !prev)} />
    </>
  );
}
