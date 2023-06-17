import React from 'react';
import { CSSProperties } from 'react';
import { Carousel } from 'flowbite-react';


export interface CarouselProps {
  imgList: string[];
}

export const CarouselCustom: React.FC<CarouselProps> = ({ imgList }) => {
  return (
    <div className="mr-3 h-full w-full border-2 rounded-lg border-secondary dark:border-secondarydark">
      <Carousel className='p-3'>
        {/* Create image slides */}
          {
            imgList.map((img, index) => (
              <div className="flex h-full items-center justify-center">
                <img src={`assets/${img}`} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."></img>
              </div>
            ))
          }
      </Carousel>
    </div>
  );
};
