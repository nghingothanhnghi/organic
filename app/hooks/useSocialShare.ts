import { useCallback } from "react";

type ShareData = {
  platform: string;
  url: string;
  title?: string;
  description?: string;
};

const useSocialShare = () => {
  const sharePost = useCallback(({ platform, url, title, description }: ShareData) => {
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title || "")}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title ? title + " - " : ""}${description ? description + " " : ""}${url}`)}`;
        break;
      case "tiktok":
        shareUrl = `https://www.tiktok.com/share?url=${encodeURIComponent(url)}`;
        break;
      default:
        console.warn("Unsupported platform:", platform);
        return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }, []);

  return { sharePost };
};

export default useSocialShare;