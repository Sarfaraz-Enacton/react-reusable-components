import { useRef, useState } from "react";
import "swiper/swiper-bundle.css";
import Heading from "./Heading";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Slider = ({ data, title }: { data: any; title?: string }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // console.log(isLoading);
  // const handleBeforeInit = () => {
  //   setIsLoading(true);
  // };

  // const handleAfterInit = () => {
  //   setIsLoading(false);
  // };

  const handleSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    setIsHidden(!swiper.allowSlidePrev && !swiper.allowSlideNext);
  };

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  };

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  return (
    <section className="animate-fade-in">
      <div className="container">
        <div className="flex items-center justify-between gap-2 pb-1 sm:pb-2">
          {title && <Heading size="md" title={title} />}
          {!isHidden && (
            <div className={`flex items-center gap-1`}>
              <button
                onClick={handlePrev}
                disabled={isBeginning}
                className="cursor-pointer rounded-md bg-gray-200 p-1 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2"
              >
                <ChevronLeftIcon className="size-4 stroke-2 sm:size-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={isEnd}
                className="cursor-pointer rounded-md bg-gray-200 p-1 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2"
              >
                <ChevronRightIcon className="size-4 stroke-2 sm:size-5" />
              </button>
            </div>
          )}
        </div>

        <div className="!-mx-4">
          {/* {isLoading && <div className="">loading...</div>} */}
          <Swiper
            onSwiper={handleSwiper}
            onSlideChange={handleSlideChange}
            // onBeforeInit={handleBeforeInit}
            // onInit={handleAfterInit}
            spaceBetween={16}
            breakpoints={{
              0: {
                spaceBetween: 12,
              },
              640: {
                spaceBetween: 16,
              },
            }}
            slidesPerView={"auto"}
            className="max-w-full !px-4"
            wrapperClass="max-w-full"
          >
            {data.map((item: any, index: number) => (
              <SwiperSlide
                key={index}
                className="!h-auto !w-[230px] py-2 sm:!w-[300px]"
              >
                <a href="#" className="group flex h-full flex-col">
                  <div className="aspect-video shrink-0 overflow-hidden rounded-t-lg">
                    <img
                      className="h-full w-full object-cover"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                  <div className="flex h-full flex-col gap-1 rounded-b-lg bg-gray-200 p-3 sm:gap-2 sm:p-4">
                    <h3 className="line-clamp-1 text-base font-medium sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="line-clamp-2 text-sm sm:text-base">
                      {item.description}
                    </p>
                    <div className="mt-auto flex items-center gap-2 font-semibold text-gray-600 group-hover:text-gray-800">
                      <span className="text-sm sm:text-base">read more</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 transition duration-300 ease-in-out group-hover:translate-x-1.5 sm:size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Slider;
