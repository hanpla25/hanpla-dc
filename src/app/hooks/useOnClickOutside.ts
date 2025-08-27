import { useEffect } from "react";

export default function useOnClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    function listener(event: MouseEvent | TouchEvent) {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    }

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}
