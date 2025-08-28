"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// --- Type ---
import { GallMeta } from "@/app/lib/type/gallType";

// --- UI ---
import Btns from "./Btns";
import Logo from "./Logo";
import SearchModal from "./SearchModal";
import RecentGall from "./RecentGall";
import MobileMenuWrapper from "./MobileMenuWrapper";
import { UserPayload } from "@/app/lib/type/userType";

type Props = {
  userToken: UserPayload | null;
  allGallList: GallMeta[];
};

export default function Header({ userToken, allGallList }: Props) {
  const isLogin = userToken ? true : false;
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchClick = () => setIsModalOpen((prev) => !prev);
  const handleMobileMenuClick = () => setIsMobileMenuOpen((prev) => !prev);
  const closeModalClick = () => setIsModalOpen(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="mx-auto max-w-6xl relative">
      <div className="flex items-center justify-between px-2 py-4">
        <Logo />
        <Btns
          isLogin={isLogin}
          onSearchClick={handleSearchClick}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileClick={handleMobileMenuClick}
        />
      </div>

      {isModalOpen && (
        <SearchModal
          onOutsideClick={closeModalClick}
          allGallList={allGallList}
        />
      )}
      {isMobileMenuOpen && <MobileMenuWrapper isLogin={isLogin} />}
      <RecentGall gallData={allGallList} />
    </header>
  );
}
