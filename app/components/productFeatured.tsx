import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import type { ProductDisplayProps, Product } from '~/types/product'; // Import types
import ProductCard from './productCard'; // Import ProductCard

const ProductFeatured = ({ products, viewMode }: ProductDisplayProps) => {
  // Filter featured products
  const featuredProducts = products.filter((product: Product) => product.featured);

  return (
    <section className="featured-products lg:py-16">
      <div className='mb-10 text-center'>
        <h2 className="text-3xl font-bold">Featured Products</h2>
        <p className="mx-auto mt-4 max-w-md text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
          dicta incidunt est ipsam, officia dolor fugit natus?
        </p>
      </div>
      <div className='container mx-auto flex items-center justify-between py-4 px-6'>
        {/* Swiper Component to display featured products */}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={3}
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
              slidesPerView: 2, // For medium screens
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5, // For large screens
              spaceBetween: 15,
            },
          }}
        >
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product: Product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))
          ) : (
            <p className="text-center text-gray-500">No featured products available at the moment.</p>
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default React.memo(ProductFeatured); // Optimize re-renders
