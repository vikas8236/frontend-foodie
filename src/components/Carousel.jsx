import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productsData } from "../redux-toolkit/productsSlice";
import Loader from "./Loader";

const Carousel = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state)=>state.products);
  useEffect(() => {
    dispatch(productsData());
  }, []);


  return (
    <>
      {products.isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-full p-4">
          <div className="ml-[46px] mr-[46px]">
            <h1 className="text-slate-800 text-2xl md:text-3xl md:ml-16 font-extrabold">
              What's on your mind?
            </h1>

            <div className="w-full h-full bg-[#ffffff] overflow-x-auto hide-scrollbar md:ml-2">
              <div className="flex space-x-2 w-full h-60 place-items-center">
                {products.map((item) => {
                  return (
                    <Link to={`/category/${item.id}`} key={item.id}>
                      <div className="min-w-[200px] bg-white flex cursor-pointer justify-center  items-center flex-col px-2 rounded-md transform transition-transform duration-300 hover:scale-90">
                        <img
                          src={item.image}
                          alt=""
                          className="w-32 h-36 md:w-36 rounded-full md:h-40 shadow-inherit"
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            <hr className="w-full h-[2px] bg-slate-200" />
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel;
