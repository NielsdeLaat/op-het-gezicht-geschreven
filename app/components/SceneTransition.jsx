"use client";

import { useEffect, useState } from "react";
import styles from "./SceneTransition.module.css";

const TRANSITION_DURATION = 2400; // 2.4s in milliseconds

export default function SceneTransition({
  onTransitionComplete,
  isTransitioning,
}) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    console.log("SceneTransition mounted");
    const timeout = setTimeout(() => {
      console.log("SceneTransition complete");
      onTransitionComplete();
    }, TRANSITION_DURATION);
    return () => clearTimeout(timeout);
  }, [isTransitioning]);

  if (!isAnimating) return null;

  return (
    <div className={styles.transitionOverlay}>
      <div className={styles.curtain} />
    </div>
  );
}
