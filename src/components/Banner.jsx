import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import foodBanner1 from '../assets/foodBanner1.png'
import foodBanner2 from '../assets/foodBanner2.png'

function Banner () {
        return (
          <Carousel>
            <div className="w-[90vw] max-h-[500px] flex md:flex-row gap-2 items-center my-6 justify-center p-4">
              <img src={foodBanner1} alt="" className="w-[80vw]" />
            </div>
            <div className="w-[90vw] max-h-[625px] flex md:flex-row gap-2 items-center my-6 justify-center p-4">
              <img src={foodBanner2} alt="" className="w-[80vw]" />
            </div>
          </Carousel>
        );
    }

export default Banner;

{/* <div className="w-[90vw] max-h-[625px] flex md:flex-row gap-2 items-center my-6 justify-center p-2">
      <img src={foodBanner2} alt="" className='w-[80vw]' />
    </div> */}