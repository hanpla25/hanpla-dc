"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LoginLink({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const pathname = usePathname();
  const href = `/login?callbackUrl=${encodeURIComponent(pathname)}`;

  return (
    <Link href={href} className={className}>
      {text}
    </Link>
  );
}
