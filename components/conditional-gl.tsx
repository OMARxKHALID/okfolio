"use client";

import { usePathname } from "next/navigation";
import { GL } from "./gl";

export function ConditionalGL() {
  const pathname = usePathname();

  // Only show GL on home page
  const isHomePage = pathname === "/";

  if (!isHomePage) {
    return null;
  }

  return (
    <div id="webgl">
      <GL />
    </div>
  );
}
