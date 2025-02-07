'use client';
import { useTranslation } from '@/translation/client';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import SwiperCore from 'swiper';
import { Mousewheel, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Button from '../../core/Button';
import StoreCard from '../Cards/StoreCard';
import Heading from '@/components/core/Heading';

SwiperCore.use([Navigation]);

export default function StoreSlider({
  data,
  title,
  url,
  isRefresh,
  viewAllOnClick,
}: {
  data: any;
  title?: string;
  url?: string;
  isRefresh?: boolean;
  viewAllOnClick?: () => void;
}) {
  const initialTheme = localStorage.getItem('theme') || 'light';
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [hideButtons, setHideButtons] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;

    const handleSwiperUpdate = () => {
      if (swiperInstance) {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
        setHideButtons(
          swiperInstance.slides.length <= swiperInstance.params.slidesPerView
        );
      }
    };

    if (swiperInstance) {
      handleSwiperUpdate();
      swiperInstance.on('slideChange', handleSwiperUpdate);
      swiperInstance.on('reachEnd', handleSwiperUpdate);
      swiperInstance.on('reachBeginning', handleSwiperUpdate);
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.off('slideChange', handleSwiperUpdate);
        swiperInstance.off('reachEnd', handleSwiperUpdate);
        swiperInstance.off('reachBeginning', handleSwiperUpdate);
      }
    };
  }, [data]);

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <section className="animate-fade-in">
      <div className="container">
        <div className="flex items-center justify-between gap-2 pb-4">
          <div>
            <Heading size="sm" title={title} />
          </div>

          <div className="flex-shrink-0 flex items-center gap-2">
            {isBeginning && isEnd ? (
              <></>
            ) : (
              <div
                className={`max-md:hidden ${hideButtons ? 'hidden' : 'flex'} items-center gap-0.5`}
              >
                <button
                  onClick={handlePrev}
                  className="p-1 disabled:opacity-50"
                  disabled={isBeginning}
                >
                  <ChevronLeftIcon className="w-3 sm:w-4 h-3 sm:h-4 stroke-2 text-white" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1 disabled:opacity-50"
                  disabled={isEnd}
                >
                  <ChevronRightIcon className="w-3 sm:w-4 h-3 sm:h-4 stroke-2 text-white" />
                </button>
              </div>
            )}

            {url && (
              <Button
                role="link"
                variant="tertiary"
                size="sm"
                url={url}
                label={t('show_all')}
              />
            )}

            {viewAllOnClick && (
              <Button
                role="button"
                variant="tertiary"
                size="sm"
                onClick={viewAllOnClick}
                label={t('show_all')}
              />
            )}
          </div>
        </div>

        <div className="!-mx-4 sm:!-mx-6">
          <Swiper
            // modules={[Mousewheel]}
            // mousewheel={{
            //   releaseOnEdges: true,
            //   forceToAxis: false,
            //   sensitivity: 1,
            // }}
            ref={swiperRef}
            spaceBetween={16}
            breakpoints={{
              0: {
                spaceBetween: 12,
              },
              640: {
                spaceBetween: 16,
              },
            }}
            slidesPerView={'auto'}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            className="max-w-full !px-4 sm:!px-6"
            wrapperClass="max-w-full"
          >
            {data.map((item: any, index: number) => (
              <SwiperSlide key={index} className="!w-[288px]">
                <StoreCard data={item} isRefresh={isRefresh} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
