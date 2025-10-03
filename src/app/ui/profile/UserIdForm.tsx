"use client";

import Form from "next/form";
import { useState } from "react";

// --- Types ---
type Props = {
  userId: string;
};

function Button({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-1 text-sm rounded-md border border-neutral-300 hover:bg-neutral-100 transition"
    >
      {label}
    </button>
  );
}

export default function UserIdForm({ userId }: Props) {
  const [value, setValue] = useState(userId);
  const [isModify, setIsModify] = useState(false);

  const handleModButton = () => {
    setIsModify(true);
  };

  const saveButton = () => {
    return;
  };

  const cancelButton = () => {
    setValue(userId);
    setIsModify(false);
  };

  return (
    <Form action={""}>
      <div className="flex items-center justify-between border-b">
        <div className="flex-1 space-y-1">
          <label htmlFor="nickname" className="block text-sm text-neutral-500">
            아이디 (4 - 10 글자)
          </label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            readOnly={!isModify}
            minLength={4}
            maxLength={10}
            className="w-full py-1.5 outline-0"
          />
        </div>
        {!isModify ? (
          <Button label="수정" onClick={handleModButton} />
        ) : (
          <div className="space-x-1">
            <Button label="저장" onClick={saveButton} />
            <Button label="취소" onClick={cancelButton} />
          </div>
        )}
      </div>
    </Form>
  );
}
