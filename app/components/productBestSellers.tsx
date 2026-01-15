import React, { useState, useEffect, useRef } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import type { ProductDisplayProps, Product } from "~/types/product"; // Import types
import ProductCard from "./productCard";
import EmptyState from "./emptyState";
import IconProductEmpty from "~/assets/empty-item.png";
import BubbleBackground from "./backgroundAnim/bubbleBackground";

const ProductBestSellers = ({ products, viewMode }: ProductDisplayProps) => {
  const [progress, setProgress] = useState(0);
  // Swiper state management
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  // Filter bestseller products
  const bestsellerProducts = products.filter(
    (product: Product) => product.bestseller
  );
  useEffect(() => {
    if (swiperInstance) {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);

      // Listen to slide change and update progress
      swiperInstance.on("slideChange", () => {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
        setProgress(swiperInstance.progress); // Update progress bar
      });

      swiperInstance.on("progress", (swiper: { progress: React.SetStateAction<number>; }) => {
        setProgress(swiper.progress); // Ensure smooth progress tracking
      });
    }
  }, [swiperInstance]);


  return (
    <section className="bestseller-products py-16 bg-gray-50 dark:bg-gray-900 relative">
      <BubbleBackground
        backgroundColor="bg-gray-50"
        bubbleColor="bg-gray-300"
        bubbleCount={30}
        minSize={15}
        maxSize={50}
        minDuration={4}
        maxDuration={8}
      />
      <div className="px-10 mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-orange-800 sm:text-4xl">
          Chuyên gia khuyên dùng
        </h2>
        <p className="mx-auto max-w-md mt-8 text-lg leading-relaxed text-gray-700">
          Không hóa chất, hoàn toàn tự nhiên, không sử dụng chất bảo quản. Phù
          hợp với người già, có bệnh mãn tính với tim mạch, tiểu đường...
        </p>
      </div>

      <div className="relative mx-auto max-w-screen-xl flex items-center justify-between p-3 sm:py-4 sm:px-6 md:py-10">
        {/* Left Shadow */}
        {!isBeginning && (
          <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent pointer-events-none z-10"></div>
        )}
        {/* Swiper Component to display bestseller products */}
        <Swiper
          className="w-full py-5"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={5}
          pagination={false}
          onSwiper={setSwiperInstance} // Store instance in state
          onSlideChange={(swiper) => setProgress(swiper.progress)} // Track progress
          onProgress={(swiper) => setProgress(swiper.progress)} // Ensure smooth updates
          navigation={false}
          breakpoints={{
            320: {
              slidesPerView: 2, // For small screens
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2, // For small screens
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 3, // For medium screens
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5, // For large screens
              spaceBetween: 15,
            },
          }}
        >
          {bestsellerProducts.length > 0 ? (
            bestsellerProducts.map((product: Product) => (
              <SwiperSlide key={product.id}>
                {/* Use the reusable ProductCard component */}
                <ProductCard product={product} />
              </SwiperSlide>
            ))
          ) : (
            <EmptyState
              messageKey="empty.bestsellers"
              fallbackMessage="Không có sản phẩm bán chạy nào vào lúc này."
              image={IconProductEmpty}
              link=""
              linkTextKey=""
              fallbackLinkText=""
            />
          )}
        </Swiper>
        {/* Right Shadow */}
        {!isEnd && (
          <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent pointer-events-none z-10"></div>
        )}
      </div>
      {/* Centered Progress Bar with Max Width 100px */}
      <div className="w-full flex justify-center my-4">
        <div className="relative w-full max-w-[100px] h-1 bg-gray-300 rounded overflow-hidden">
          <div
            className="h-full bg-lime-900 transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(ProductBestSellers);
