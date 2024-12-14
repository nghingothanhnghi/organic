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
    spaceBetween = 50,
    slidesPerView = 3,
    onSlideChange,
    onSwiper,
}) => {

    return (
        <Swiper
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
                640: { slidesPerView: 1 },    // Show 1 slide for screens >= 640px
                768: { slidesPerView: 1 },    // Show 1 slides for screens >= 768px
                1024: { slidesPerView: 2 },   // Show 2 slides for screens >= 1024px
              }}
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div
                        className="slide-content"
                        style={{
                            background: slide.background,
                            padding: '20px',
                            borderRadius: '10px',
                            color: '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start',
                            textAlign: 'left',
                            height: '100%',
                        }}
                    >
                        <h2>{slide.title}</h2>
                        <p>{slide.description}</p>
                        <button className="w-auto mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                            {slide.buttonText}
                        </button>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperLayout;