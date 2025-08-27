// --- Icons ---
import { Search } from "lucide-react";

export default function SearchIcon({ onClick }: { onClick: () => void }) {
  return <Search size={18} onClick={onClick} className="cursor-pointer" />;
}
