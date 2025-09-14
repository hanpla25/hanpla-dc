// --- UI ---
import Search from "./search";
import HeaderLinks from "./HeaderLinks";
import MobileMenu from "./mobile-menu";

// --- Types ---
import { GallMeta } from "@/app/lib/types/gall";

type Props = {
  isLogin: boolean;
  gallList: GallMeta[];
};

export default function Btns({ isLogin, gallList }: Props) {
  return (
    <div
      className={`flex items-center ${isLogin ? "gap-2 lg:gap-4" : "gap-4"}`}
    >
      <Search gallList={gallList} />
      <HeaderLinks isLogin={isLogin} className="hidden lg:block" />
      <MobileMenu isLogin={isLogin} />
    </div>
  );
}
