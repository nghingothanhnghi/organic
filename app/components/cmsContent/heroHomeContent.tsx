
// app/components/cmsContent/heroHomeContent.tsx
import React, { useEffect } from 'react';
import SwiperLayout from '../swiperLayout';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchBanners } from '~/features/bannerSlice';
import { DEFAULT_CUSTOMER_ID } from '~/constants/apiConstants';

const HeroHomeContent = () => {
    const dispatch = useAppDispatch();
    const { banners, loading: bannersLoading, error: bannersError } = useAppSelector(state => state.banners);


    // Fetch banners
    useEffect(() => {
        dispatch(fetchBanners(DEFAULT_CUSTOMER_ID)); // Uses DEFAULT_CUSTOMER_ID
    }, [dispatch]);

    const handleSlideChange = () => {
        console.log('Slide changed');
    };

    const handleSwiperInstance = (swiper: any) => {
        console.log('Swiper instance:', swiper);
    };

    return (
        <SwiperLayout
            slides={
                bannersLoading
                    ? [{ title: 'Loading...', description: '', buttonText: '', background: '#f1fff4' }]
                    : bannersError
                        ? [{ title: 'Error loading banners', description: bannersError, buttonText: '', background: '#ffdddd' }]
                        : banners.map(banner => ({
                            title: banner.attributes.title || 'No Title',
                            description: banner.attributes.description || '',
                            buttonText: banner.attributes.buttonText || 'Learn More',
                            background: banner.attributes.imageUrl || 'linear-gradient(to right, #C6EBC9, #f1ffd8)',
                        }))
            }
            spaceBetween={30}
            slidesPerView={2}
            onSlideChange={handleSlideChange}
            onSwiper={handleSwiperInstance}
        />
    );
};

export default HeroHomeContent;