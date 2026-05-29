/**
 * 404 Not Found page
 * @module app/not-found
 */

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#030c1b] px-4 text-center text-[#f3ebd8]">
      <p className="t-eyebrow mb-4 text-[#dfc38a]">Lost in the palace</p>
      <h1 className="mb-4 font-serif text-[120px] leading-none text-[#dfc38a]/15 md:text-[160px]">
        404
      </h1>
      <h2 className="mb-4 font-serif text-2xl uppercase tracking-wide text-[#f3ebd8] md:text-3xl">
        Page Not Found
      </h2>
      <p className="mb-9 max-w-md text-sm leading-7 text-[#f3ebd8]/65">
        The page you are looking for does not exist or has been moved. Perhaps
        return to the throne and explore the collection.
      </p>
      <Link
        href="/"
        className={cn(
          "inline-flex items-center gap-2 border border-[#dfc38a] bg-[#dfc38a] px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#030c1b]",
          "transition-colors hover:bg-[#f3ebd8]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc38a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030c1b]",
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
