import Link from "next/link";

// --- Constants ---
import {
  CATEGORY_HREF,
  PROFILE_HREF,
  SIGNUP_HREF,
} from "@/app/lib/constants/href";

// --- UI ---
import LoginLink from "../common/LoginLink";
import LogoutBtn from "../common/LogoutBtn";

type Props = {
  isLogin: boolean;
  className?: string;
};

export default function HeaderLinks({ isLogin, className }: Props) {
  return (
    <>
      <Link href={CATEGORY_HREF} className={className}>
        전체 갤러리
      </Link>
      {isLogin ? (
        <>
          <Link href={PROFILE_HREF} className={className}>
            프로필
          </Link>
          <LogoutBtn className={className} />
        </>
      ) : (
        <>
          <Link href={SIGNUP_HREF} className={className}>
            회원가입
          </Link>
          <LoginLink text="로그인" className={className} />
        </>
      )}
    </>
  );
}
