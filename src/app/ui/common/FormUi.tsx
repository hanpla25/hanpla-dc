import { KeyboardEventHandler } from "react";

export function FormInput({
  type,
  name,
  label,
  defaultValue,
  minLength,
  maxLength,
  placeholder,
  onKeyDown,
}: {
  type: string;
  name: string;
  label: string;
  defaultValue?: string;
  minLength?: number;
  maxLength?: number;
  placeholder: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-sm text-neutral-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue}
        minLength={minLength}
        maxLength={maxLength}
        required
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none"
      />
    </div>
  );
}

export function FormSubmitButton({
  label,
  isPending,
}: {
  label: string;
  isPending: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="w-full py-2 bg-neutral-800 text-white rounded-md text-sm hover:bg-neutral-700 transition disabled:opacity-50 cursor-pointer"
    >
      {label}
    </button>
  );
}

export const FormMsg = ({ msg }: { msg: string }) => {
  return <p className="text-sm text-red-500 mt-2">{msg}</p>;
};
