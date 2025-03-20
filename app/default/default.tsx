import React, { useEffect } from 'react';
import HeroHomeContent from '~/components/cmsContent/heroHomeContent';
import SwiperLayout from "~/components/swiperLayout";
import ProductGallery from "~/components/productGallery";
import ProductFeatured from '~/components/productFeatured';
import ProductBestSellers from '~/components/productBestSellers';
import { useAppDispatch, useAppSelector } from "~/hooks";
import { fetchProducts, setFilters } from '~/features/productSlice';
import AboutContent from '~/components/cmsContent/aboutContent';
import WarrantyContent from '~/components/cmsContent/warrantyContent';
import TestimonialContent from '~/components/cmsContent/testimonialContent';

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


  return (
    <div>
      <HeroHomeContent/>
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
      <TestimonialContent/>
      <ProductGallery products={products} />
    </div>
  );
};

export default Default;