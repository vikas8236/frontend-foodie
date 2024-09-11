import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GoDot } from "react-icons/go";
import { IoIosBicycle } from "react-icons/io";
import { LuVegan } from "react-icons/lu";

const RestaurantsDetail = () => {
  const params = useParams("");
  console.log(params.id);

  const RestaurantsDetailUri = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.99740&lng=79.00110&restaurantId=${params.id}&catalog_qa=undefined&submitAction=ENTER`;

  const [RestaurantsDetail, setRestaurantsDetail] = useState([]);

  useEffect(() => {
    const fetchRestaurantsDetail = async () => {
      try {
        const response = await fetch(RestaurantsDetailUri);
        const data = await response.json();
        setRestaurantsDetail(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRestaurantsDetail();
  }, []);

  const restaurantTitle = RestaurantsDetail?.data?.cards[0]?.card?.card?.text;
  const restaurantData = RestaurantsDetail.data?.cards[2]?.card?.card;
  // console.log("restaurantData----", restaurantData);
  const restaurantOfferData =
    RestaurantsDetail.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
      ?.offers;
  // console.log("restaurantOfferData----", restaurantOfferData);
  const recommendedDataArray =
    RestaurantsDetail?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
      ?.cards[2].card?.card?.itemCards;
  console.log("recommendedDataArray----", recommendedDataArray);
  return (
    <div className="w-[55%] h-full mx-auto ">
      {/* Restaurant Short Detail */}
      <div className="w-full h-full mt-12 text-2xl font-bold ">
        <h1 className="mb-4">{restaurantTitle}</h1>
        <div className="w-full h-full rounded-3xl pt-0  px-4 pb-4 outline-1  bg-slate-100 ">
          <div className=" p-2 rounded-3xl  shadow-lg border-2 border-slate-500 shadow-gray-500 bg-white ">
            <div className="flex justify-between">
              <div>
                <p className="flex">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnGenF_VBi-3q4TH74Tmv0cU2F38L2L55-fg&s"
                    alt=""
                    className="rounded-full w-4 mt-[6px] h-4"
                  />
                  <span className="text-[16px] text-slate-900 font-sans ml-1 font-bold tracking-tighter">
                    {restaurantData?.info?.avgRating} (
                    {restaurantData?.info?.totalRatingsString})
                  </span>{" "}
                  <span className="font-bold ml-1 mt-[-4px]">:</span>
                  <span className="text-[16px] text-slate-900 font-sans ml-1 font-bold tracking-tighter">
                    {restaurantData?.info?.costForTwoMessage}
                  </span>
                </p>
                <p className=" text-md text-orange-600 md:text-[14px] truncate cursor-pointer font-bold">
                  <u>{restaurantData?.info?.cuisines.join(", ")}</u>
                </p>
                <div className="flex">
                  <div className="w-12 h-10 border-red-500 text-slate-700 border-3 flex flex-col">
                    <span>
                      <GoDot />
                    </span>
                    <span className="text-4xl mt-[-14px] ml-[6px] mb-[-3px]">
                      |
                    </span>
                    <span>
                      <GoDot />
                    </span>
                  </div>
                  <div className="text-[14px] text-slate-900">
                    <p>
                      Outlet{" "}
                      <span className="text-gray-700">
                        {restaurantData?.info?.areaName}
                      </span>
                    </p>
                    <p>{restaurantData?.info?.sla?.slaString.toLowerCase()}</p>
                  </div>
                </div>
              </div>
              <div className="w-56 h-36 ">
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurantData?.info?.cloudinaryImageId}`}
                  alt=""
                  className="w-56 h-36 rounded-3xl"
                />
              </div>
            </div>
            <hr className="w-full h-[1px] bg-slate-200" />
            <div className="text-[16px] font-medium text-slate-600">
              <span className="flex gap-2">
                <IoIosBicycle className="mt-2" />
                {restaurantData?.info?.feeDetails?.message}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Restaurant Short Detail end */}

      {/* Offer Details */}
      <div>
        <div className="my-8 ">
          <h1 className="text-2xl font-bold">Deals for you</h1>
        </div>
        <div className="flex min-w-full overflow-x-auto hide-scrollbar gap-8 ">
          {restaurantOfferData?.map((item) => {
            return (
              <>
                <div className="flex rounded-xl cursor-pointer border-2 p-2 w-full h-24 ">
                  <div className="min-w-[80px] bg-white flex cursor-pointer justify-center items-center flex-col px-2 rounded-md transform transition-transform duration-300 hover:scale-90">
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_56,h_56/${item?.info?.offerLogo}`}
                      alt=""
                    />
                  </div>
                  <div className="flex min-w-[200px] flex-col p-2 font-medium text-lg text-gray-900">
                    <span className="text-black font-bold">
                      {item?.info?.header}
                    </span>
                    <span className="text-slate-600">
                      {item?.info?.couponCode}
                    </span>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      {/* offer Details end */}

      {/* Recommended food */}
      <div className="">
        <div className="my-8">
          <h1 className="text-2xl font-bold">
            Recommended ({recommendedDataArray?.length})
          </h1>
        </div>
        {/* Food Detail */}
        {recommendedDataArray?.map((item) => {
          const VegColor = item?.card?.info?.itemAttribute?.vegClassifier === "VEG" ? "text-green-500" : "text-red-500";
          const RatingColor =
            item?.card?.info?.ratings?.aggregatedRating?.rating >= '3.0' ? "text-green-500" : "text-yellow-500";
          return (
            <div className="flex  justify-end mb-4 border-b-2 border-gray-200 p-4">
              {/* Content */}
              <div className="w-2/3 font-bold text-xl">
                <div className="flex space-x-1 text-red-400 w-10 h-8">
                  <span className={`${VegColor} mt-1`}>
                    <LuVegan />
                  </span>
                  <span className="">
                    {item?.card?.info?.ribbon?.text ?? null}
                  </span>
                </div>
                <div className="font-[700] text-[16px]">
                  <h2 className="text-gray-700">{item?.card?.info?.name}</h2>
                  <p>₹{item?.card?.info?.price / 100}</p>
                  <p>
                    <span className={`${RatingColor}`}>
                      ★{item?.card?.info?.ratings?.aggregatedRating?.rating}
                    </span>
                    <span className="text-gray-500 font-[500]">
                      (
                      {
                        item?.card?.info?.ratings?.aggregatedRating
                          ?.ratingCountV2
                      }
                      )
                    </span>
                  </p>
                </div>
                <div className="font-normal text-[16px]">
                  <p>{item?.card?.info?.description}</p>
                </div>
              </div>
              {/* Image & button */}
              <div className="relative w-[25%] h-40 mx-auto">
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.card?.info?.imageId}`}
                  alt=""
                  className="w-full h-36 rounded-lg"
                />
                <button className=" ml-12 absolute font-bold bottom-[-20px] left-0 m-2 text-lg border-4 rounded-lg text-emerald-500  bg-white  px-8 py-1">
                  Add
                </button>
              </div>
            </div>
          );
        })}

        {/* Food Detail end */}
      </div>
    </div>
  );
};

export default RestaurantsDetail;
