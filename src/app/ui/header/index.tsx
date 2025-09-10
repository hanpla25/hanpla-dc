// --- UI ---
import Logo from "./Logo";
import Btns from "./Btns";
import { GallMeta } from "@/app/lib/types/gall";

type Props = {
  isLogin: boolean;
  gallList: GallMeta[];
};

export default function Header({ isLogin, gallList }: Props) {
  return (
    <>
      <header className="flex items-center justify-between px-2 py-4">
        <Logo />
        <Btns gallList={gallList} isLogin={isLogin} />
      </header>
    </>
  );
}
