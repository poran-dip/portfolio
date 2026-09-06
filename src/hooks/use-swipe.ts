import { useRef } from "react";

interface UseSwipeOptions {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  /** Minimum horizontal distance (px) to count as a swipe rather than a tap. */
  threshold?: number;
}

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  /** Wraps a click handler so it's skipped once right after a swipe — a
   * swipe's touchend fires the same click event a tap would, which would
   * otherwise also trigger whatever the click normally does. */
  wrapClick: (onClick: () => void) => () => void;
}

const DEFAULT_THRESHOLD = 50;

/** Detects a left/right swipe on touch devices from plain touchstart/touchend
 * deltas — no live drag-follow, the gesture only resolves on release.
 * Mostly-vertical drags are ignored so it doesn't fight page scrolling. */
export const useSwipe = ({
  onSwipeLeft,
  onSwipeRight,
  threshold = DEFAULT_THRESHOLD,
}: UseSwipeOptions): SwipeHandlers => {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const wasSwipeRef = useRef(false);

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = touch
      ? { x: touch.clientX, y: touch.clientY }
      : null;
    wasSwipeRef.current = false;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;

    const touch = e.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < threshold || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    wasSwipeRef.current = true;
    if (deltaX < 0) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  };

  const wrapClick = (onClick: () => void) => () => {
    if (wasSwipeRef.current) {
      wasSwipeRef.current = false;
      return;
    }
    onClick();
  };

  return { onTouchStart, onTouchEnd, wrapClick };
};
