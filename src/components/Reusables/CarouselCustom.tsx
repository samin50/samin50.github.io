import React from 'react';
import { CSSProperties } from 'react';
import { Carousel } from 'flowbite-react';


export interface CarouselProps {
  imgList: string[];
  slide?: boolean;
  className?: string;
}

const defaultProps: CarouselProps = {
  imgList: [],
  slide: false,
  className: ""
}

export const CarouselCustom: React.FC<CarouselProps> = ({imgList, slide, className }) => {
  return (
    <div className={className}>
      <div className="mr-3 h-full w-full border-2 rounded-lg border-secondary dark:border-secondarydark">
        <Carousel className='p-3' slide={slide}>
          {/* Create image slides */}
          {
            imgList.map((media, index) => {
              const isYouTube = media.includes('youtube.com');
              const isVideo = media.includes('mp4');
              if (isYouTube) {
                return (
                  <div className="flex h-full items-center justify-center">
                    <iframe
                      className="h-full w-full"
                      src={media}
                      allow='fullscreen;'
                    />
                  </div>
                );
              } else if (isVideo) {
                return (
                  <div className="flex h-full items-center justify-center" id="container">
                    <video
                      className="h-full w-full"
                      src={`assets/${media}`}
                      controls
                      muted
                      autoPlay
                    />
                  </div>
                );
              } else {
                return (
                  <div className="flex h-full items-center justify-center">
                    <img
                      src={`assets/${media}`}
                      className="absolute block h-full"
                      alt="..."
                    />
                  </div>
                );
              }
            })
          }
        </Carousel>
      </div>
    </div>
  );
};

CarouselCustom.defaultProps = defaultProps;

export default CarouselCustom;