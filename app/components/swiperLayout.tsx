// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

interface CustomSwiperProps {
  slides: React.ReactNode[]; // An array of slide contents (React nodes)
  spaceBetween?: number; // Optional, space between slides
  slidesPerView?: number; // Optional, number of slides to show at once
  onSlideChange?: () => void; // Optional callback when slide changes
  onSwiper?: (swiper: any) => void; // Optional callback to get swiper instance
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({
  slides,
  spaceBetween = 50,
  slidesPerView = 3,
  onSlideChange,
  onSwiper,
}) => {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      onSlideChange={onSlideChange}
      onSwiper={onSwiper}
    >
      {slides.map((slideContent, index) => (
        <SwiperSlide key={index}>{slideContent}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSwiper;
