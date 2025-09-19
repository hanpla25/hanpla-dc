// --- UI ---
import HeadText from "@/app/ui/common/HeadText";
import AuthForm from "@/app/ui/signup/SignupForm";

export default function SignupPage() {
  return (
    <>
      <HeadText text="회원가입" />
      <AuthForm />
    </>
  );
}
