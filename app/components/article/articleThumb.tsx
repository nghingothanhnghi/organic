import React from 'react';
import { getImageUrl } from '~/utils/getImageUrl'; // Import the getImageUrl function
import EmptyImageIcon from '~/assets/photos-empty.png'; // Default image if no valid image is found
import { useTranslation } from 'react-i18next'; // Import for i18n support if needed
import type { Article, ArticleImage } from '~/types/article';

interface ArticleThumbProps {
  article: Article | null; // Expect the full article object
  className?: string; // Optional class name for styling
  width?: number; // Optional width for the image
  height?: number; // Optional height for the image
}

const ArticleThumb: React.FC<ArticleThumbProps> = ({ article, className = "mb-3 img-fluid", width, height }) => {
  const { t } = useTranslation();

   // Handle the case where article is null
   if (!article) {
    return (
      <img
        src={EmptyImageIcon} // Use the default image
        alt={t('article.noProduct')} // Fallback alt text for missing article
        className={className}
        width={width}
        height={height}
      />
    );
  }

  // Check if articleImg exists and is an array of images
  const articleImg: ArticleImage | null =
//   article.media && article.media.length > 0 ? article.media[0] : null;
  article.media?.length > 0 ? article.media[0] : null;

  console.log("Article Image Data:", articleImg); // Debugging log

  // If articleImg exists, try to get the URL for the small format
  const imageUrl = articleImg
    ? getImageUrl(articleImg, 'thumbnail') // Pass the media object to get the small format image URL
    : article.imageUrl && article.imageUrl.trim() !== ''
    ? article.imageUrl
    : EmptyImageIcon;

  return (
    <img
      src={imageUrl}
      alt={article.title}
      className={className}
      width={width}
      height={height}
    />
  );
};

export default ArticleThumb;
