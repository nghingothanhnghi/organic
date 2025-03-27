import React from "react";
import useSocialShare from "~/hooks/useSocialShare";

type SocialShareProps = {
  url: string;
  title?: string;
  description?: string;
  position?: "fixed right-center" | "fixed left-center" | "normal";
  direction?: "row" | "col";
  buttonClass?: string;
};

const platforms = [
  { name: "facebook", label: "Facebook", color: "bg-blue-600" },
  { name: "twitter", label: "Twitter", color: "bg-sky-500" },
  { name: "linkedin", label: "LinkedIn", color: "bg-blue-700" },
  { name: "whatsapp", label: "WhatsApp", color: "bg-green-500" },
  { name: "tiktok", label: "TikTok", color: "bg-black" },
];

const positionClasses: Record<string, string> = {
  "fixed right-center": "fixed right-5 top-1/2 transform -translate-y-1/2",
  "fixed left-center": "fixed left-5 top-1/2 transform -translate-y-1/2",
  normal: "relative mx-auto",
};

const SocialShare: React.FC<SocialShareProps> = ({ url, title, description, position = "normal", direction = "row", buttonClass = "px-4 py-2" }) => {
  const { sharePost } = useSocialShare();
  const positionClass = positionClasses[position] || "";
  const directionClass = direction === "col" ? "flex-col space-y-3" : "flex-row space-x-3";
  return (
    <div className={`flex ${directionClass} ${positionClass}`}>
      {platforms.map(({ name, label, color }) => (
        <button
          key={name}
          onClick={() => sharePost({ platform: name, url, title, description })}
          className={` text-white rounded-md ${color} hover:opacity-80 transition-all ${buttonClass}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SocialShare;