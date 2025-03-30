import React from "react";

interface BubbleBackgroundProps {
  backgroundColor?: string; // Default background color
  bubbleColor?: string; // Bubble color
  bubbleCount?: number; // Number of bubbles
  minSize?: number; // Minimum bubble size
  maxSize?: number; // Maximum bubble size
  minDuration?: number; // Minimum animation duration
  maxDuration?: number; // Maximum animation duration
}

const BubbleBackground: React.FC<BubbleBackgroundProps> = ({
  backgroundColor = "bg-blue-200",
  bubbleColor = "bg-white",
  bubbleCount = 20,
  minSize = 20,
  maxSize = 70,
  minDuration = 3,
  maxDuration = 6,
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden z-[-1] ${backgroundColor}`}>
      {/* Generate multiple bubbles */}
      {[...Array(bubbleCount)].map((_, i) => (
        <div
          key={i}
          className={`absolute ${bubbleColor} rounded-full opacity-20 animate-bubble`}
          style={{
            width: `${Math.random() * (maxSize - minSize) + minSize}px`,
            height: `${Math.random() * (maxSize - minSize) + minSize}px`,
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 50}px`,
            animationDuration: `${Math.random() * (maxDuration - minDuration) + minDuration}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default BubbleBackground;
