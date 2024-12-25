import React from 'react';

// Define supported platforms
type SharePlatform = 'messenger' | 'whatsapp' | 'zalo';

interface ShareButtonProps {
  platform: SharePlatform;
  message: string;
  url: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ platform, message, url }) => {
  // Share links for each platform
  const getShareUrl = (platform: SharePlatform) => {
    const encodedMessage = encodeURIComponent(message);
    const encodedUrl = encodeURIComponent(url);
    switch (platform) {
      case 'messenger':
        return `https://www.messenger.com/t/?link=${encodedUrl}&message=${encodedMessage}`;
      case 'whatsapp':
        return `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`;
      case 'zalo':
        return `https://zalo.me/share?link=${encodedUrl}&title=${encodedMessage}`;
      default:
        return '';
    }
  };

  return (
    <a
      href={getShareUrl(platform)}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 text-white rounded-md bg-blue-500 hover:bg-blue-600"
    >
      Share on {platform.charAt(0).toUpperCase() + platform.slice(1)}
    </a>
  );
};

export default ShareButton;
