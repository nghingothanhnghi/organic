import React from "react";
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

const ProductBestSellers = ({ products, viewMode }: ProductDisplayProps) => {
  // Filter bestseller products
  const bestsellerProducts = products.filter(
    (product: Product) => product.bestseller
  );

  return (
    <section className="bestseller-products py-16 bg-gray-50 dark:bg-gray-900">
      <div className="px-10 mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-orange-800 sm:text-4xl">
          Chuyên gia khuyên dùng
        </h2>
        <p className="mx-auto max-w-md mt-8 text-lg leading-relaxed text-gray-700">
          Không hóa chất, hoàn toàn tự nhiên, không sử dụng chất bảo quản. Phù
          hợp với người già, có bệnh mãn tính với tim mạch, tiểu đường...
        </p>
      </div>
      <div className="mx-auto max-w-screen-xl flex items-center justify-between p-3 sm:py-4 sm:px-6">
        {/* Swiper Component to display bestseller products */}
        <Swiper
          className="w-full py-5"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          pagination={{ clickable: true }}
          navigation
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
      </div>
    </section>
  );
};

export default React.memo(ProductBestSellers);
