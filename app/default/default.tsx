import SwiperLayout from "~/components/swiperLayout";

const slideData = [
    {
      title: 'Slide 1',
      description: 'This is the first slide description.',
      buttonText: 'Learn More',
      background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Gradient background
    },
    {
      title: 'Slide 2',
      description: 'This is the second slide description.',
      buttonText: 'Get Started',
      background: 'url("https://via.placeholder.com/600x300") center/cover no-repeat', // Image background
    },
    {
      title: 'Slide 3',
      description: 'This is the third slide description.',
      buttonText: 'Explore More',
      background: 'linear-gradient(to right, #6a11cb, #2575fc)', // Gradient background
    },
    {
      title: 'Slide 4',
      description: 'This is the fourth slide description.',
      buttonText: 'Join Now',
      background: 'url("https://via.placeholder.com/600x300") center/cover no-repeat', // Image background
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
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
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