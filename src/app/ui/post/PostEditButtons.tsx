"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// --- Actions ---
import { deletePost, checkPasswordToPost } from "@/app/lib/actions/post";

// --- Hooks ---
import useOnClickOutside from "@/app/hooks/useOnClickOutside";

// --- Types ---
type Props = {
  postDataIsLogin: boolean;
  postId: number;
};

export default function PostEditButtons({ postDataIsLogin, postId }: Props) {
  const style = "block border border-neutral-400 px-1 py-0.5 cursor-pointer";
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const modalRef = useRef<HTMLFormElement>(null);

  useOnClickOutside(modalRef, () => setShowPassword(false));

  const handleDeleteClick = async () => {
    if (postDataIsLogin) {
      const deleteResult = await deletePost(postId);
      if (deleteResult.success) {
        alert(deleteResult.msg);
        router.back();
      } else {
        alert(deleteResult.msg);
      }
    } else {
      setShowPassword(true);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("password", password);

    const result = await checkPasswordToPost(postId, formData);

    if (!result.success) {
      setPasswordError(result.message || "비밀번호가 일치하지 않습니다.");
      return;
    }

    const deleteResult = await deletePost(postId);
    if (deleteResult.success) {
      alert(deleteResult.msg);
      router.back();
    } else {
      alert(deleteResult.msg);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 mx-2">
      <Link href={`/test/write?postId=${postId}`} className={style}>
        수정하기
      </Link>

      <button onClick={handleDeleteClick} className={style}>
        삭제하기
      </button>

      {showPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <form
            ref={modalRef}
            onSubmit={handlePasswordSubmit}
            className="bg-white p-4 rounded shadow-md flex flex-col gap-3 w-80"
          >
            <h3 className="text-lg font-semibold">비밀번호 확인</h3>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-neutral-400 px-2 py-1 rounded w-full"
            />
            {passwordError && (
              <span className="text-red-500 text-sm">{passwordError}</span>
            )}
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                className="px-3 py-1 border border-neutral-400 rounded hover:bg-neutral-100"
                onClick={() => setShowPassword(false)}
              >
                취소
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-neutral-500 text-white rounded hover:bg-neutral-600"
              >
                확인
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
