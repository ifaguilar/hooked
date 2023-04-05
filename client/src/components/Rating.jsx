import React, { useRef, useEffect } from "react";

// Utils
import { isInTheFuture } from "../utils/DateTime";
import { roundNumber } from "../utils/roundNumber";

const Rating = ({ voteAverage, releaseDate }) => {
  const size = 60;
  const backgroundRadius = size / 2;
  const radius = 25;
  const circunference = 2 * Math.PI * radius;

  const percentage = roundNumber(voteAverage, 1) * 10;

  const progressRef = useRef();

  useEffect(() => {
    setProgress();
  }, [voteAverage]);

  const setProgress = () => {
    progressRef.current.style.strokeDasharray = circunference;
    progressRef.current.style.strokeDashoffset =
      circunference - (percentage / 100) * circunference;
  };

  return (
    <div className="relative">
      <svg width={size} height={size}>
        <circle
          className="fill-neutral-900"
          r={backgroundRadius}
          cx={size / 2}
          cy={size / 2}
        ></circle>
        <circle
          className={`${
            isInTheFuture(releaseDate)
              ? "stroke-neutral-700"
              : percentage > 60
              ? "stroke-green-900"
              : percentage > 40
              ? "stroke-amber-900"
              : "stroke-red-900"
          } stroke-[4px] fill-none`}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        ></circle>
        <circle
          className={`${
            percentage > 60
              ? "stroke-green-400"
              : percentage > 40
              ? "stroke-amber-400"
              : "stroke-red-400"
          } stroke-[4px] fill-none -rotate-90 origin-center`}
          ref={progressRef}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeLinecap="round"
        ></circle>
      </svg>
      <div className="absolute top-0 left-0 w-[60px] h-[60px] flex items-center justify-center">
        {isInTheFuture(releaseDate) && voteAverage === 0 ? (
          <span className="text-white font-semibold text-sm">NR</span>
        ) : (
          <span className="text-white font-semibold text-sm">
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
};

export default Rating;
