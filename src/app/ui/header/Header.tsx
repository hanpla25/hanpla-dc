"use client";

import { useState } from "react";

// --- Type ---
import { GallMeta } from "@/app/lib/type/gallType";

// --- UI ---
import Btns from "./Btns";
import Logo from "./Logo";
import SearchModal from "./SearchModal";

type Props = {
  allGallList: GallMeta[];
};

export default function Header({ allGallList }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchClick = () => setIsModalOpen((prev) => !prev);
  const closeModalClick = () => setIsModalOpen(false);

  return (
    <header className="mx-auto max-w-6xl relative">
      <div className="flex items-center justify-between p-4">
        <Logo />
        <Btns onSearchClick={handleSearchClick} />
      </div>

      {isModalOpen && (
        <SearchModal
          onOutsideClick={closeModalClick}
          allGallList={allGallList}
        />
      )}
    </header>
  );
}
