import SwiperLayout from "~/components/swiperLayout";

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
        </div>
      );
    };
  
  export default Default;