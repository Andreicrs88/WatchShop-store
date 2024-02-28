// utils
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// this functions scroll to the top of each page when the page is accessed

// the component is used when a new path is accessed
export default function ScrollToTopComponent() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      // behavior: "smooth",
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

// the function is used when the path stays the same, but the page content changes (when changing pages)
export function scrollToTopFn() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
    // behavior: "instant",
  });
}
