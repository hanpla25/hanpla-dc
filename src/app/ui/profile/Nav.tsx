"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// --- Icons ---
import { MessageCircle, User, MessageSquare } from "lucide-react";

// --- Types ---
type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

function NavLink({ label, href, icon }: NavItem) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block px-3 py-2 w-full rounded-md transition ${
        isActive
          ? "font-medium text-neutral-900"
          : "hover:bg-neutral-100 text-neutral-400"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </Link>
  );
}

export default function Nav() {
  const links: NavItem[] = [
    { label: "회원정보", href: "/profile", icon: <User size={18} /> },
    {
      label: "게시글",
      href: "/profile/posts",
      icon: <MessageCircle size={18} />,
    },
    {
      label: "댓글",
      href: "/profile/comments",
      icon: <MessageSquare size={18} />,
    },
  ];

  return (
    <nav className="flex flex-row justify-between md:flex-col gap-3">
      {links.map((item) => (
        <NavLink key={item.href} {...item} />
      ))}
    </nav>
  );
}
