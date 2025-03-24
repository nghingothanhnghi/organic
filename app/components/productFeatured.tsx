import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import type { ProductDisplayProps, Product } from "~/types/product"; // Import types
import ProductCard from "./productCard"; // Import ProductCard
import NavSwiperButton from "./navSwiperButton";
import EmptyState from "./emptyState";
import IconProductEmpty from "~/assets/empty-item.png";

const ProductFeatured = ({ products, viewMode }: ProductDisplayProps) => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  // Filter featured products
  const featuredProducts = products.filter(
    (product: Product) => product.featured
  );

  useEffect(() => {
    if (swiperInstance) {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);

      swiperInstance.on("slideChange", () => {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
      });
    }
  }, [swiperInstance]);

  return (
    <section className="featured-products py-16 ">
      <div className="px-10 mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-orange-800 sm:text-4xl">
          Sản phẩm tốt cho phụ nữ
        </h2>
        <p className="mx-auto max-w-md mt-8 text-orange-950 text-lg leading-8">
          Phục hồi, chống lão hóa da mặt, giúp bạn có làn da khỏe mạnh. Ngăn
          ngừa không khí, bụi ô nhiễm, tia OV trực tiếp
        </p>
      </div>
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-3 sm:py-4 sm:px-6">
        {/* Swiper Component to display featured products */}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          onSwiper={setSwiperInstance}
          spaceBetween={10}
          slidesPerView={3}
          navigation={{
            prevEl: "#prevBtnDesktop",
            nextEl: "#nextBtnDesktop",
          }}
          breakpoints={{
            320: {
              slidesPerView: 2, // For small screens
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 3, // For small screens
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
          className="py-5"
        >
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product: Product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))
          ) : (
            <EmptyState
              messageKey="empty.bestsellers"
              fallbackMessage="No featured products available at the moment."
              image={IconProductEmpty}
              link=""
              linkTextKey=""
              fallbackLinkText=""
            />
          )}
        </Swiper>
      </div>
      <div className="lg:mt-10 flex justify-center gap-4 mb-10">
        <NavSwiperButton
          direction="prev"
          id="prevBtnDesktop"
          disabled={isBeginning}
        />
        <NavSwiperButton
          direction="next"
          id="nextBtnDesktop"
          disabled={isEnd}
        />
      </div>
    </section>
  );
};

export default React.memo(ProductFeatured); // Optimize re-renders
