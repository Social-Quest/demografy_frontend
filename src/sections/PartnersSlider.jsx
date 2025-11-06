import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import partners1 from '../assets/partners1.png'
import partners2 from '../assets/partners2.png'
import partners3 from '../assets/partners3.png'
import partners4 from '../assets/partners4.png'

function PartnersSlider({ className = '', headingClassName = '' }) {
  const partners = [partners1, partners2, partners3, partners4];

  return (
    <div className={`w-full overflow-hidden py-16 ${className}`}>
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <h2 className={`mb-10 text-center text-xl font-medium text-slate-700 ${headingClassName}`}>
          Our data partners
        </h2>

        <div className="relative w-full">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 60,
              },
              1024: {
                slidesPerView: "auto",
                spaceBetween: 80,
              },
            }}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            speed={2000}
            allowTouchMove={false}
            freeMode={false}
            className="partners-swiper"
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <SwiperSlide
                key={index}
                className="!flex items-center justify-center"
              >
                <div className="flex items-center justify-center h-20 md:h-24 px-2 md:px-4 w-full lg:w-auto">
                  <img
                    src={partner}
                    alt={`Partner ${(index % partners.length) + 1}`}
                    className="h-full w-auto max-w-[120px] md:max-w-[240px] object-contain transition-opacity hover:opacity-80"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default PartnersSlider
