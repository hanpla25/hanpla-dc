"use client";

import { useRouter } from "next/navigation";

function CancleButton() {
  const router = useRouter();

  const handleCancel = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCancel}
      className="min-w-[72px] px-4 py-2 border border-neutral-300 rounded-md text-sm hover:bg-neutral-100 transition cursor-pointer text-center"
    >
      취소
    </button>
  );
}

function WriteButton({ isPending }: { isPending: boolean }) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="min-w-[72px] px-4 py-2 bg-neutral-800 text-white rounded-md text-sm hover:bg-neutral-700 transition disabled:opacity-50 cursor-pointer text-center"
    >
      글쓰기
    </button>
  );
}

export default function Buttons({ isPending }: { isPending: boolean }) {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <CancleButton />
      <WriteButton isPending={isPending} />
    </div>
  );
}
