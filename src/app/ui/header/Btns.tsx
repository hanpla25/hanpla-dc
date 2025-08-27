import Link from "next/link";

// --- Constants ---
import { PROFILE_HREF, SIGNUP_HREF } from "@/app/lib/constants/href-constants";

// --- UI ---
import SearchIcon from "./SearchIcon";
import MobileMenuBtn from "./MobileMenuBtn";
import LoginLink from "../common/LoginLink";
import LogoutBtn from "../common/LogoutBtn";

const MobileBtns = ({ onSearchClick }: { onSearchClick: () => void }) => {
  return (
    <div className="flex items-center gap-4 lg:hidden">
      <SearchIcon onClick={onSearchClick} />
      <MobileMenuBtn isMobileMenuOpen={false} />
    </div>
  );
};

const DesktopBtns = ({
  onSearchClick,
  isLogin,
}: {
  onSearchClick: () => void;
  isLogin: boolean;
}) => {
  return (
    <div className="lg:flex items-center gap-4 hidden">
      <SearchIcon onClick={onSearchClick} />
      {isLogin ? (
        <>
          <Link href={PROFILE_HREF}>프로필</Link>
          <LogoutBtn />
        </>
      ) : (
        <>
          <LoginLink text="로그인" />
          <Link href={SIGNUP_HREF}>회원가입</Link>
        </>
      )}
    </div>
  );
};

export default function Btns({ onSearchClick }: { onSearchClick: () => void }) {
  return (
    <>
      <MobileBtns onSearchClick={onSearchClick} />
      <DesktopBtns onSearchClick={onSearchClick} isLogin={false} />
    </>
  );
}
