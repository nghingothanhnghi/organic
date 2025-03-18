
// app/components/cmsContent/heroHomeContent.tsx
import React, { useEffect } from 'react';
import SwiperLayout from '../swiperLayout';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { useTranslation } from 'react-i18next';
import { fetchBanners } from '~/features/bannerSlice';
import { DEFAULT_CUSTOMER_ID } from '~/constants/apiConstants';

const HeroHomeContent = () => {
    const {t} = useTranslation();
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

    const defaultBackgrounds = [
        'linear-gradient(to right, #C6EBC9, #f1ffd8)',
        'linear-gradient(to right, #FFD700, #FFA500)',
        'linear-gradient(to right, #87CEEB, #4682B4)',
        'linear-gradient(to right, #FFB6C1, #FF69B4)',
        'linear-gradient(to right, #98FB98, #32CD32)'
    ];

    return (
        <SwiperLayout
            slides={
                bannersLoading
                    ? [{ title: 'Loading...', description: '', buttonText: '', background: '#f1fff4' }]
                    : bannersError
                        ? [{ title: 'Error loading banners', description: bannersError, buttonText: '', background: '#ffdddd' }]
                        : banners.map((banner, index) => ({
                            title: banner.bannerTitle || 'No Title',
                            description: banner.bannerDescription || '',
                            buttonText: t('btn.learn_more'), // No buttonText in your banner data
                            background: banner.bannerImageURI || defaultBackgrounds[index % defaultBackgrounds.length],
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