// --- Icons ---
import { AlignJustify, X } from "lucide-react";

type Props = {
  isMobileMenuOpen: boolean;
};

export default function MobileMenuBtn({ isMobileMenuOpen }: Props) {
  const Icon = isMobileMenuOpen ? X : AlignJustify;

  return <Icon className="cursor-pointer" />;
}
