import React from 'react'
import Banner from "../components/Banner";
import Carousel from "../components/Carousel"
import TrendingFood from '../components/TrendingFood'; 
import Restaurants from '../components/Restaurants';
const Home = () => {
  return (
    <div className='min-w-[70%] mx-auto'>
      <Banner />
      <Carousel />
      <TrendingFood />
      <Restaurants />
    </div>
  )
}

export default Home;
