// Import Swiper React components
import React, { useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

// Define the interface for slide content
interface SlideContent {
    title: string;
    description: string;
    buttonText: string;
    background: string; // Can be a color or image URL
}

interface SwiperLayoutProps {
    slides: SlideContent[]; // An array of slide objects containing title, description, button, and background
    spaceBetween?: number; // Optional, space between slides
    slidesPerView?: number; // Optional, number of slides to show at once
    onSlideChange?: () => void; // Optional callback when slide changes
    onSwiper?: (swiper: any) => void; // Optional callback to get swiper instance
}

const SwiperLayout: React.FC<SwiperLayoutProps> = ({
    slides,
    spaceBetween = 1,
    slidesPerView = 3,
    onSlideChange,
    onSwiper,
}) => {

    return (
        <Swiper
            direction="horizontal"
            modules={[Pagination, Scrollbar]}
            pagination={{
                clickable: true, // Make pagination clickable
                type: 'fraction', // Show slide numbers like "1/5"
            }}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            onSlideChange={onSlideChange}
            onSwiper={onSwiper}
            scrollbar={{ draggable: true }}
            breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 1 },    // Show 1 slide for screens >= 320px
                640: { slidesPerView: 1, spaceBetween: 1 },    // Show 1 slide for screens >= 640px
                768: { slidesPerView: 2, spaceBetween: 1 },    // Show 1 slides for screens >= 768px
                1024: { slidesPerView: 2, spaceBetween: 1 },   // Show 2 slides for screens >= 1024px
            }}
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div
                        className="slide-content"
                        style={{
                            background: slide.background,
                            padding: '20px 30px',
                            color: '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            textAlign: 'left',
                            minHeight: '400px',
                        }}
                    >
                        <div className='mx-auto w-full max-w-full md:max-w-[400px]'>
                            <h2 className='text-2xl md:text-4xl font-bold text-lime-900 dark:text-neutral-50'>{slide.title}</h2>
                            <p className='text-sm md:text-xl mt-4 text-yellow-950'>{slide.description}</p>
                            <button className="mt-8 px-4 py-2 text-white bg-orange-900 hover:bg-orange-800 rounded-lg shadow-md hover:shadow-lg">
                                {slide.buttonText}
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperLayout;
