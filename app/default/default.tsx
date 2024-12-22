import React, { useEffect } from 'react';
import SwiperLayout from "~/components/swiperLayout";
import ProductGallery from "~/components/productGallery";
import ProductFeatured from '~/components/productFeatured';
import ProductBestSellers from '~/components/productBestSellers';
import { useAppDispatch, useAppSelector } from "~/hooks";
import { fetchProducts, setFilters } from '~/features/productSlice';
import AboutContent from '~/components/cmsContent/aboutContent';
import WarrantyContent from '~/components/cmsContent/warrantyContent';

const slideData = [
  {
    title: 'Slide 1',
    description: 'This is the first slide description.',
    buttonText: 'Learn More',
    background: 'linear-gradient(to right, #f1fff4, #f1ffd8)', // Gradient background
  },
  {
    title: 'Slide 2',
    description: 'This is the second slide description.',
    buttonText: 'Get Started',
    background: 'linear-gradient(to right, #f1ffd8, #C6EBC9)', // Image background
  },
  {
    title: 'Slide 3',
    description: 'This is the third slide description.',
    buttonText: 'Explore More',
    background: 'linear-gradient(to right, #C6EBC9, #C6EBC9)', // Gradient background
  },
  {
    title: 'Slide 4',
    description: 'This is the fourth slide description.',
    buttonText: 'Join Now',
    background: '#C6EBC9',
  },
];

const Default = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error, pagination, filters } = useAppSelector(state => state.products);

  // Fetch products on page load (or when the component is mounted)
  useEffect(() => {
    // Dispatch with the required parameters (e.g., first page, default page size)
    dispatch(fetchProducts({
      page: 1,       // Fetch the first page
      pageSize: 10,  // Set a page size (e.g., 10 products per page)
      filters: {}    // Optional filters if needed
    }));
  }, [dispatch]);

  const handleSlideChange = () => {
    console.log('Slide changed');
  };

  const handleSwiperInstance = (swiper: any) => {
    console.log('Swiper instance:', swiper);
  };

  return (
    <div>
      <SwiperLayout
        slides={slideData}
        spaceBetween={30}
        slidesPerView={2}
        onSlideChange={handleSlideChange}
        onSwiper={handleSwiperInstance}
      />
      <WarrantyContent/>
      <AboutContent />
      {/* Bestsellers Carousel */}
      <ProductBestSellers
        products={products}
        viewMode="grid"
        pagination={null}
        currentPage={0}
        pageSize={0}
        onPageChange={function (page: number): void {
          throw new Error('Function not implemented.');
        }}
        loading={false}
        error={null}
      />
      {/* Featured Products Carousel */}
      <ProductFeatured
        products={products}
        viewMode="grid"
        pagination={null}
        currentPage={0}
        pageSize={0}
        onPageChange={function (page: number): void {
          throw new Error('Function not implemented.');
        }}
        loading={false}
        error={null}
      />
      <ProductGallery products={products} />
    </div>
  );
};

export default Default;