import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { restaurantsData, selectRestaurants } from "../redux-toolkit/restaurantsSlice";
import Loader from "./Loader";

const TrendingFood = () => {
  const dispatch = useDispatch();
  const { restaurants } = useSelector((state)=>state.restaurants);
  useEffect(() => {
    dispatch(restaurantsData());
  }, []);


  return (
    <>
      {restaurants?.isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-full p-4">
          <div className="ml-[46px]  mr-[46px]">
            <h1 className="text-slate-900 text-2xl md:text-3xl md:ml-16 font-extrabold mb-6  ">
            Top Restaurants Chain in Indore
            </h1>
            <div className="mt-2 w-full h-full bg-[#ffffff] overflow-x-auto hide-scrollbar mb-8">
              <div className="flex space-x-6 place-items-center w-full h-full">
                {restaurants.filter((item)=> item.rating < 4.0).map((product) => {
                  return (
                    <Link to={`/restaurants/${product?.id}`} key={product?.id}>
                      <div className=" md:w-[300px] w-[220px] cursor-pointer bg-white object-scale-down shadow-stone-400 rounded-md mt-4 p-0 transform transition-transform duration-400 hover:scale-90">
                        <img
                          src={product.resImage}
                          alt=""
                          className=" object-cover rounded-xl w-[220px] md:min-w-[300px] h-48"
                        />
                        <p className="z-10  mt-[-30px] text-white text-xl font-bold ml-3">
                          {product?.offer}
                        </p>
                        <p className="text-md text-gray-800 md:text-xl  px-2 font-semibold font-sans truncate">
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
                          <p className=" text-md text-slate-600 md:text-[14px] truncate font-medium">
                            {product?.menue}
                          </p>
                          <p className=" text-md text-slate-600 md:text-[14px] truncate font-medium ">
                            {product?.locality}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            <hr className="w-full h-[2px] bg-slate-200 mt-4" />
          </div>
        </div>
      )}
    </>
  );
};

export default TrendingFood;
