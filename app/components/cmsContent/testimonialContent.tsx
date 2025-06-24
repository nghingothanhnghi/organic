// app/components/cmsContent/aboutContent.tsx
import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import NavSwiperButton from "../navSwiperButton";
import StarIcon from "../startIcon";
import useResponsive from "~/hooks/useResponsive";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    id: 1,
    title: "Chất lượng 5 sao",
    name: "Minh Hoa, Bình Chánh",
    quote: "Tôi có mua chén dùng để ươm thủy canh. Sản phẩm rất tốt, thân thiện với môi trường.,",
    rating: 5,
  },
  {
    id: 2,
    title: "Bộ trồng thủy canh quá ưng ý!",
    name: "Chị Như, Củ Chi",
    quote: "Hệ thống trồng thủy canh tại nhà rất gọn, dễ di chuyển, tôi có thể tự lắp đặt qua hướng dẫn của đội ngủ organic. Cho 5 sao shop",
    rating: 5,
  },
  {
    id: 3,
    title: "Cám ơn shop",
    name: "Chị Như, Củ Chi",
    quote: "Hệ thống trồng thủy canh đơn giản, giá chấp nhận được.",
    rating: 4,
  },
];

// Define a type for the testimonial data
interface Testimonial {
  id: number;
  name: string;
  quote: string;
  rating: number;
}

const TestimonialContent = () => {
  // Get the responsiveness states from the hook
  const { isMobile, isDesktop } = useResponsive();

  // Swiper state management
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperInstance) {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);

      // Update state on slide change
      swiperInstance.on("slideChange", () => {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
      });
    }
  }, [swiperInstance]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:items-center lg:gap-16">
          <div className="max-w-xl px-10 lg:px-0 text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-3xl font-bold tracking-tight text-orange-800 sm:text-4xl">
              Sức khỏe là nền tảng của thành công...
            </h2>
            <p className="text-lg mt-8 leading-relaxed text-gray-700">
              Đối với organic, trách nhiệm với cộng đồng luôn là nền tảng cho sự
              phát triển bền vững.
            </p>
            <div
              className={`hidden lg:justify-center lg:mt-10 lg:flex lg:gap-4`}
            >
              <>
                <NavSwiperButton
                  direction="prev"
                  id="prevBtnDesktop"
                  className="custom-class"
                  disabled={isBeginning}
                />
                <NavSwiperButton
                  direction="next"
                  id="nextBtnDesktop"
                  className="custom-class"
                  disabled={isEnd}
                />
              </>
            </div>
          </div>

          <div className="-mx-6 px-10 lg:col-span-2 lg:mx-0">
            <div className="relative">
              {/* Left Shadow */}
              {!isBeginning && (
                <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent pointer-events-none z-10"></div>
              )}
              <Swiper
                modules={[Navigation]}
                onSwiper={setSwiperInstance} // Store Swiper instance
                navigation={{
                  prevEl: isDesktop ? "#prevBtnDesktop" : "#prevBtnMobile",
                  nextEl: isDesktop ? "#nextBtnDesktop" : "#nextBtnMobile",
                }}
                slidesPerView={isMobile ? 1 : 2}
                spaceBetween={20}
                className="py-5 items-stretch"
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id} className="flex h-full">
                    <blockquote className="flex h-full flex-col justify-between bg-white rounded-lg  p-6 shadow-md sm:p-8 lg:p-12">
                      <div>
                        <div className="flex gap-0.5 text-green-500">
                          {Array.from({ length: 5 }, (_, i) => {
                            const full = i < Math.floor(testimonial.rating);
                            const half = i === Math.floor(testimonial.rating) && testimonial.rating % 1 >= 0.5;
                            return (
                              <StarIcon
                                key={i}
                                filled={full}
                                half={half}
                                className="h-5 w-5"
                                readOnly={true}
                              />
                            );
                          })}
                        </div>

                        <div className="mt-4">
                          <p className="text-2xl font-bold text-orange-950 sm:text-3xl">
                            {testimonial.title}
                          </p>
                          <p className="mt-4 leading-relaxed text-gray-700">
                            {testimonial.quote}
                          </p>
                        </div>
                      </div>

                      <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                        &mdash; {testimonial.name}
                      </footer>
                    </blockquote>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Right Shadow */}
              {!isEnd && (
                <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent pointer-events-none z-10"></div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`mt-8 flex justify-center gap-4 lg:hidden ${isMobile ? "lg:flex" : ""
            }`}
        >
          {isMobile && (
            <>
              <NavSwiperButton
                direction="prev"
                id="prevBtnMobile"
                className="custom-class"
                disabled={isBeginning}
              />
              <NavSwiperButton
                direction="next"
                id="nextBtnMobile"
                className="custom-class"
                disabled={isEnd}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialContent;
