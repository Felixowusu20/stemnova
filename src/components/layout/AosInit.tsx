"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

const aosOptions = {
  duration: 800,
  easing: "ease-out-cubic",
  once: true,
  offset: 80,
  delay: 0,
  anchorPlacement: "top-bottom" as const,
  disable: () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
};

/** Starts Animate On Scroll after layout, including photos that load late. */
export function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init(aosOptions);

    let timer = 0;
    const settle = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => AOS.refreshHard(), 160);
    };

    settle();
    window.addEventListener("load", settle);
    window.addEventListener("resize", settle);

    const onImage = (event: Event) => {
      if ((event.target as HTMLElement | null)?.tagName === "IMG") {
        AOS.refresh();
      }
    };
    document.addEventListener("load", onImage, true);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", settle);
      window.removeEventListener("resize", settle);
      document.removeEventListener("load", onImage, true);
    };
  }, [pathname]);

  return null;
}
