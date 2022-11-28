import React from 'react';
import img1 from '../../../asset/images/banner/1.png'
import img2 from '../../../asset/images/banner/2.png';
import img3 from '../../../asset/images/banner/3.png';
import img4 from '../../../asset/images/banner/4.png';


import BannerItem from './BannerItem';

const bannerData = [
    {
        image: img1,
        prev: 5,
        id: 1,
        next: 2
    },
    {
        image: img2,
        prev: 1,
        id: 2,
        next: 3
    },
    {
        image: img3,
        prev: 2,
        id: 3,
        next: 4
    },
    {
        image: img4,
        prev: 3,
        id: 4,
        next: 1
    },
  
   
]

const Banner = () => {
    return (
        <div className="carousel w-full py-10 h-full ">
            {
                bannerData.map(slide => <BannerItem
                    key={slide.id}
                    slide={slide}
                ></BannerItem>)
            }
            
        </div>
    );
};

export default Banner;