"use client";

import { useMemo } from "react";
import InteractiveHotspot from "./InteractiveHotspot";

export default function TimelineHotspot({
  id,
  label,
  startTime,
  endTime,
  keyframes,
  thought,
  currentTime,
  onClick,
}) {
  // Calculate current position based on keyframes
  const currentPosition = useMemo(() => {
    if (!keyframes || keyframes.length === 0) {
      return { top: 50, left: 50 }; // Default position if no keyframes
    }

    // Sort keyframes by time
    const sortedKeyframes = [...keyframes].sort((a, b) => a.time - b.time);

    // Find the surrounding keyframes
    let prevKeyframe = sortedKeyframes[0];
    let nextKeyframe = sortedKeyframes[sortedKeyframes.length - 1];

    for (let i = 0; i < sortedKeyframes.length - 1; i++) {
      if (
        sortedKeyframes[i].time <= currentTime &&
        sortedKeyframes[i + 1].time > currentTime
      ) {
        prevKeyframe = sortedKeyframes[i];
        nextKeyframe = sortedKeyframes[i + 1];
        break;
      }
    }

    // Calculate interpolation factor
    const factor =
      (currentTime - prevKeyframe.time) /
      (nextKeyframe.time - prevKeyframe.time);

    // Interpolate position
    return {
      top: prevKeyframe.top + (nextKeyframe.top - prevKeyframe.top) * factor,
      left:
        prevKeyframe.left + (nextKeyframe.left - prevKeyframe.left) * factor,
    };
  }, [keyframes, currentTime]);

  // Only render if within time range
  if (currentTime < startTime || currentTime > endTime) {
    return null;
  }

  return (
    <InteractiveHotspot
      key={id}
      position={currentPosition}
      onClick={() => onClick(thought)}
      label={label}
    />
  );
}
