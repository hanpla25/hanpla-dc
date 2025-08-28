import Link from "next/link";
import {
  CATEGORY_HREF,
  PROFILE_HREF,
} from "@/app/lib/constants/href-constants";
import LogoutBtn from "../common/LogoutBtn";
import LoginLink from "../common/LoginLink";

type Props = {
  isLogin: boolean;
};

const className = "block w-full hover:bg-neutral-100 py-2";

const LoginItems = () => {
  return (
    <>
      <li>
        <Link href={PROFILE_HREF} className={className}>
          프로필
        </Link>
      </li>
      <li>
        <LogoutBtn className={className} />
      </li>
    </>
  );
};

const NonLoginItems = () => {
  return (
    <>
      <li>
        <LoginLink text="로그인" className={className} />
      </li>
      <li>
        <Link href={PROFILE_HREF} className={className}>
          회원가입
        </Link>
      </li>
    </>
  );
};

export default function MobileMenuWrapper({ isLogin }: Props) {
  return (
    <ul className="absolute left-0 bg-white z-50 p-2 w-[100vw] h-[calc(100vh-64px)] flex flex-col gap-4">
      <li>
        <Link href={CATEGORY_HREF} className={className}>
          전체 갤러리
        </Link>
      </li>
      {isLogin ? <LoginItems /> : <NonLoginItems />}
    </ul>
  );
}
