import { Suspense } from "react";

// --- Ui ---
import GallList from "../category/GallList";

export default function PopularGall() {
  return (
    <div className="px-2 flex flex-nowrap overflow-x-auto gap-2 mt-2">
      <Suspense fallback={null}>
        <GallList
          order={"popular"}
          size={10}
          className="bg-neutral-200 rounded-md text-xs text-neutral-800 p-1 whitespace-nowrap "
        />
      </Suspense>
    </div>
  );
}
