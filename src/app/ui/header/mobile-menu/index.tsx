"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// --- UI ---
import MobileMenuBtn from "./Btn";
import MobileMenuWrapper from "./Modal";

type Props = {
  isLogin: boolean;
};

export default function MobileMenu({ isLogin }: Props) {
  const [isOpen, setisOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setisOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <MobileMenuBtn
        onClick={() => setisOpen((prev) => !prev)}
        isMobileMenuOpen={isOpen}
      />
      {isOpen && <MobileMenuWrapper isLogin={isLogin} />}
    </div>
  );
}
