import { redirect } from "next/navigation";

// --- Data ---
import { getUserToken } from "@/app/lib/data/user";

// --- UI ---
import HeadText from "@/app/ui/common/HeadText";
import LoginForm from "@/app/ui/Login/LoginForm";

export default async function LoginPage() {
  const token = await getUserToken();

  if (token) redirect("/");

  return (
    <>
      <HeadText text="로그인" />
      <LoginForm />
    </>
  );
}
