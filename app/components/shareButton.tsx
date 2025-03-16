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
      className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
    >
      {platform.charAt(0).toUpperCase() + platform.slice(1)}
    </a>
  );
};

export default ShareButton;
