import Link from "next/link";

// --- Constants ---
import {
  CATEGORY_HREF,
  PROFILE_HREF,
  SIGNUP_HREF,
} from "@/app/lib/constants/href-constants";

// --- UI ---
import SearchIcon from "./SearchIcon";
import MobileMenuBtn from "./MobileMenuBtn";
import LoginLink from "../common/LoginLink";
import LogoutBtn from "../common/LogoutBtn";

const MobileBtns = ({
  isMobileMenuOpen,
  onMobileClick,
  onSearchClick,
}: {
  isMobileMenuOpen: boolean;
  onMobileClick: () => void;
  onSearchClick: () => void;
}) => {
  return (
    <div className="flex items-center gap-4 lg:hidden">
      <SearchIcon onClick={onSearchClick} />
      <MobileMenuBtn
        onClick={onMobileClick}
        isMobileMenuOpen={isMobileMenuOpen}
      />
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
      <Link href={CATEGORY_HREF}>전체 갤러리</Link>
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

export default function Btns({
  isLogin,
  isMobileMenuOpen,
  onSearchClick,
  onMobileClick,
}: {
  isLogin: boolean;
  isMobileMenuOpen: boolean;
  onSearchClick: () => void;
  onMobileClick: () => void;
}) {
  return (
    <>
      <MobileBtns
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileClick={onMobileClick}
        onSearchClick={onSearchClick}
      />
      <DesktopBtns onSearchClick={onSearchClick} isLogin={isLogin} />
    </>
  );
}
