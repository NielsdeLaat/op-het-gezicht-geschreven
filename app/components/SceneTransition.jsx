"use client";

import { useEffect, useState } from "react";
import styles from "./SceneTransition.module.css";

export default function SceneTransition({ onTransitionComplete }) {
  const [isAnimating, setIsAnimating] = useState(true); // Start animating immediately

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      onTransitionComplete?.();
    }, 2400); // Match animation duration
    return () => clearTimeout(timer);
  }, [onTransitionComplete]);

  return (
    <div
      className={`${styles.transitionOverlay} ${
        isAnimating ? styles.animating : ""
      }`}
    >
      <div className={styles.curtain} />
    </div>
  );
}
