import React, { useState } from 'react';
import { CSSProperties } from 'react';
import { Carousel } from 'flowbite-react';
import styles from '../../style';


export interface CarouselProps {
  imgList: string[];
  slide?: boolean;
  className?: string;
  slideInterval?: number;
}

const defaultProps: CarouselProps = {
  imgList: [],
  slide: false,
  className: "h-48",
  slideInterval: 3000
}

export const CarouselCustom: React.FC<CarouselProps> = ({ imgList, slide, className, slideInterval }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Move to next media in carousel
  const nextMedia = () => {
    setActiveIndex((activeIndex + 1) % imgList.length);
  };

  // Move to previous media in carousel
  const prevMedia = () => {
    setActiveIndex((activeIndex - 1 + imgList.length) % imgList.length);
  };

  // Auto-slide if slide prop is true
  React.useEffect(() => {
    let timer: number | undefined;
    if (slide) {
      timer = window.setInterval(nextMedia, slideInterval);
    }
    return () => {
      if (timer) {
        window.clearInterval(timer);
      }
    };
  }, [activeIndex, slide, slideInterval]);

  const getMediaComponent = (media: string, index: number) => {
    const isYouTube = media.includes('youtube.com');
    const isVideo = media.includes('.mp4');
  
    if (isYouTube) {
      return <iframe className="h-64 w-full object-contain relative" src={media} allowFullScreen></iframe>;
    } else if (isVideo) {
      return <video className="h-64 w-full z-10 object-contain relative" src={media} controls />;
    } else {
      return <img src={media} className="h-64 w-full object-contain relative" alt={`carousel ${index}`} />;
    }
  };
  
  return (
    <div className={`${className} flex flex-col items-center space-y-4`}>
      <div className="relative h-72 w-full border-2 rounded-lg border-secondary dark:border-secondarydark flex items-center p-1">
        <button onClick={prevMedia} className="absolute left-2 z-30 border-none fill-white hover:fill-gray-400 transition-colors duration-150">
          <svg className='h-auto w-10' fill="fill-inherit" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.05 10.157l2.122-2.121L6.05 5.914 7.464 4.5 11 8.036 7.464 11.57 6.05 10.157zM8 0c4.418 0 8 3.59 8 8 0 4.418-3.59 8-8 8-4.418 0-8-3.59-8-8 0-4.418 3.59-8 8-8zm0 2C4.693 2 2 4.686 2 8c0 3.307 2.686 6 6 6 3.307 0 6-2.686 6-6 0-3.307-2.686-6-6-6z" fill-rule="evenodd"></path> </g></svg>
        </button>
        <button onClick={nextMedia} className="absolute right-2 z-30 border-none fill-white  hover:fill-gray-400 transition-colors duration-150">
          <svg className="h-auto w-10" fill="fill-inherit" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.05 10.157l2.122-2.121L6.05 5.914 7.464 4.5 11 8.036 7.464 11.57 6.05 10.157zM8 0c4.418 0 8 3.59 8 8 0 4.418-3.59 8-8 8-4.418 0-8-3.59-8-8 0-4.418 3.59-8 8-8zm0 2C4.693 2 2 4.686 2 8c0 3.307 2.686 6 6 6 3.307 0 6-2.686 6-6 0-3.307-2.686-6-6-6z" fill-rule="evenodd"></path> </g></svg>
        </button>
        
        {imgList.map((media, index) => (
          <div
            className={`${index === activeIndex ? 'block' : 'hidden'} w-full h-full flex items-center justify-center`}
            key={index}
          >
            {getMediaComponent(media, index)}
          </div>
        ))}
      </div>
      <div className="flex space-x-1">
        {imgList.map((_, index) => (
          <button
            key={index}
            style={{
              backgroundColor: index === activeIndex ? "white" : "black",
            }}
            className='w-4 h-4 rounded-full'
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}  

CarouselCustom.defaultProps = defaultProps;
export default CarouselCustom;
