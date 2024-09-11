import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";


const headers = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true', 
};

const Restaurants = () => {
  const [displayedRestaurants, setDisplayedRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  // const [hasMore, setHasMore] = useState(true);
  // const [totalPages, setTotalPages] = useState(1);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://foodie-git-main-vikas8236s-projects.vercel.app/restaurants/restaurants/`, {headers},
      );
      const data = response.data;
      // if (data.results.length === 0) {
      //   setHasMore(false); // No more pages to fetch
      // } else {
      //   let counts = data.count;
      //   console.log(data.results.length);
      //   let ttlpge = Math.ceil(counts / data.results.length);
      //   console.log("totalPAges-------",ttlpge );

        // setTotalPages(ttlpge); // Update total pages based on API response
        setDisplayedRestaurants(data);
      
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      // setHasMore(false); // Set hasMore to false on error to stop further fetching
    }
    setLoading(false);
    setIsInitialLoading(false);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop >=
  //       document.documentElement.scrollHeight - 1 &&
  //     !loading &&
  //     hasMore &&
  //     page < totalPages // Ensure we don't exceed the total pages
  //   ) {
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [loading, hasMore, totalPages]);

  return (
    <>
      {isInitialLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-full px-4 ">
          <h1 className="text-slate-900 text-2xl md:text-3xl md:mx-16 font-extrabold mb-6">
            Best Restaurants for online delivery
          </h1>
          <div className="mt-2 w-full h-full mx-[16px] bg-[#ffffff] mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayedRestaurants.map((product) => (
                <Link to={`restaurants/${product?.id}/`} key={product?.id}>
                  <div className="md:w-[300px] w-[220px] cursor-pointer bg-white shadow-stone-400 rounded-md mt-4 p-0 transform transition-transform duration-400 hover:scale-90">
                    <div className="w-full h-48">
                      <img
                        src={product?.resImage}
                        alt=""
                        className="object-cover z-0 rounded-xl w-[220px] md:min-w-[300px] h-48"
                      />
                      <p className="z-10 mt-[-30px] text-white text-xl font-bold ml-3">
                        {product?.offer}
                      </p>
                    </div>
                    <div className="w-full h-full">
                      <p className="text-md text-gray-800 md:text-xl px-2 font-semibold font-sans truncate">
                        {product?.resName}
                      </p>
                      <div className="px-2">
                        <p className="flex">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnGenF_VBi-3q4TH74Tmv0cU2F38L2L55-fg&s"
                            alt=""
                            className="rounded-full w-4 mt-2 h-4"
                          />
                          <span className="text-lg text-slate-700 font-sans px-2 font-semibold">
                            {product?.rating} | {product?.estimated_time}
                          </span>
                        </p>
                        <p className="text-md text-slate-600 md:text-[14px] truncate font-medium">
                          {product?.menue}
                        </p>
                        <p className="text-md text-slate-600 md:text-[14px] truncate font-medium">
                          {product?.locality}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {loading && <Loader />}
        </div>
      )}
    </>
  );
};

export default Restaurants;

