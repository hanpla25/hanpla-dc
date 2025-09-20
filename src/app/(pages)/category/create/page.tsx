import { redirect } from "next/navigation";

// --- Data ---
import { getUserToken } from "@/app/lib/data/user";

// --- UI ---
import HeadText from "@/app/ui/common/HeadText";
import CreateForm from "@/app/ui/create/CreateForm";

export default async function CreatePage() {
  const token = await getUserToken();

  if (token?.role !== "admin") redirect("/");

  return (
    <>
      <HeadText text="갤러리 생성" />
      <CreateForm />
    </>
  );
}
