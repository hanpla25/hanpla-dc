"use server";

import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

const checkValid = (gallName: string, abbr: string): string | null => {
  const gallNameRegex = /^[가-힣\s]+$/;
  if (!gallNameRegex.test(gallName)) {
    return "갤러리 이름은 한글만 입력할 수 있어요.";
  }

  const abbrRegex = /^[a-z]+$/;
  if (!abbrRegex.test(abbr)) {
    return "갤러리 주소는 영어 소문자만 입력할 수 있어요.";
  }

  return null;
};

export async function createGall(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const gallName = formData.get("gallName") as string;
  const abbr = formData.get("abbr") as string;

  const validationError = checkValid(gallName, abbr);
  if (validationError) {
    return validationError;
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("galls")
    .insert({ name: gallName, abbr });

  if (error) {
    console.error(error);
    return "이미 존재하는 갤러리 이름이거나 주소에요.";
  }

  redirect("/category");
}
