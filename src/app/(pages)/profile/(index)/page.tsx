// --- Data ---
import { fetchUserInfo, getUserToken } from "@/app/lib/data/user";

// --- UI ---
import UserInfo from "@/app/ui/profile/UserInfo";

export default async function ProfilePage() {
  const userToken = await getUserToken();
  const userInfo = await fetchUserInfo(userToken?.userId);

  return (
    <>
      <UserInfo nickname={userInfo.nickname} userId={userInfo.userId} />
    </>
  );
}
