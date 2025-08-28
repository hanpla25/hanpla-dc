// --- Icons ---
import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="min-h-[530px] flex items-center justify-center">
      <Loader2
        className="animate-spin text-neutral-600"
        aria-label="Loading"
        role="status"
      />
    </div>
  );
}
