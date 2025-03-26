import React from "react";
import useSocialShare from "~/hooks/useSocialShare";

type SocialShareProps = {
  url: string;
  title?: string;
  description?: string;
};

const platforms = [
  { name: "facebook", label: "Facebook", color: "bg-blue-600" },
  { name: "twitter", label: "Twitter", color: "bg-sky-500" },
  { name: "linkedin", label: "LinkedIn", color: "bg-blue-700" },
  { name: "whatsapp", label: "WhatsApp", color: "bg-green-500" },
  { name: "tiktok", label: "TikTok", color: "bg-black" },
];

const SocialShare: React.FC<SocialShareProps> = ({ url, title, description }) => {
  const { sharePost } = useSocialShare();

  return (
    <div className="flex justify-center space-x-3">
      {platforms.map(({ name, label, color }) => (
        <button
          key={name}
          onClick={() => sharePost({ platform: name, url, title, description })}
          className={`px-4 py-2 text-white rounded-md ${color} hover:opacity-80 transition-all`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SocialShare;