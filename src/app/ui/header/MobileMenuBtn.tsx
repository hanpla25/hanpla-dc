// --- Icons ---
import { AlignJustify, X } from "lucide-react";

type Props = {
  onClick: () => void;
  isMobileMenuOpen: boolean;
};

export default function MobileMenuBtn({ onClick, isMobileMenuOpen }: Props) {
  const Icon = isMobileMenuOpen ? X : AlignJustify;

  return <Icon onClick={onClick} className="cursor-pointer" />;
}
