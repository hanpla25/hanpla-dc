// --- Type ---
import { UserData } from "@/app/lib/type/userType";

// --- UI ---
import LoginLink from "../common/LoginLink";

type Props = {
  userData: UserData | null;
};

const NeedLogin = () => {
  return <LoginLink text="로그인이 필요해요" />;
};

export default function ProfileBox({ userData }: Props) {
  if (!userData) return <NeedLogin />;

  return <div>ProfileBox</div>;
}
