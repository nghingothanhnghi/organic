import React, {useState} from 'react';
import { getImageUrl } from '~/utils/getImageUrl';
import type { Product } from '~/types/product';

type ProductGalleryProps = {
  products: Product[];
};

const ProductGallery: React.FC<ProductGalleryProps> = ({ products }) => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set(prev.add(id)));
  };

  const images = products.flatMap((product) =>
    product.productImg.map((image) => ({
      id: image.id,
      alt: image.attributes.name || 'Product image',
      src: getImageUrl(image, 'small'),
    }))
  );

  return (
    <div className="mx-auto py-10 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-8">
       {images.map((image, index) => (
        <div key={`${image.id}-${index}`} className="relative">
          {/* Placeholder spinner while image is loading */}
          {!loadedImages.has(image.id) && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
              <svg
                className="w-8 h-8 text-gray-600 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="4" strokeLinecap="round" className="opacity-25" />
                <circle cx="12" cy="12" r="10" strokeWidth="4" strokeLinecap="round" className="opacity-75" />
              </svg>
            </div>
          )}

          {/* Actual image */}
          <img
            alt={image.alt}
            src={image.src}
            loading="lazy"
            className="aspect-[3/4] w-full rounded-lg object-cover"
            onLoad={() => handleImageLoad(image.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGallery;
