import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "./SmoothScroll";

/**
 * Scrolls the window to the top on every route change.
 * Mount once inside the router context; renders nothing.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
}
