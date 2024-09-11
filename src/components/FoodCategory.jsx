import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, incrementQuantity } from "../redux-toolkit/cartSlice";
import { toast } from "react-toastify";

const FoodCategory = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { items } = useSelector((state) => state.cart); // Accessing cart items
  const foodDetail = products.find(
    (product) => product.id === parseInt(params.id)
  );

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const existingItem = items.find(
      (item) => item.product.id === parseInt(params.id)
    );

    if (existingItem) {
      dispatch(incrementQuantity({ productId: params.id }));
      // toast.success(`${foodDetail.name} quantity increased in cart`);
    } else {
      dispatch(addToCart({ productId: params.id, quantity }));
      toast.success(`${foodDetail.name} added to cart`);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="w-full h-full p-4 mt-12">
      <h1 className="text-slate-800 text-2xl md:text-[44px] md:ml-12 font-bold mb-6 tracking-wide">
        Product Data
      </h1>

      <div className="mt-12 w-2/4 h-full mx-auto bg-white shadow-md rounded-lg mb-8">
        <div className="flex justify-between">
          <div className="w-1/2">
            <img
              src={foodDetail?.image}
              alt={foodDetail?.name}
              className="rounded-t-lg"
            />
          </div>
          <div className="text-black py-4 px-2 font-bold flex flex-col justify-start items-start my-auto w-1/2">
            <h1 className="text-4xl p-4 py-2">
              {foodDetail?.name.toUpperCase()}
            </h1>
            <p className="text-2xl p-4 py-2">₹{foodDetail?.price}</p>
            <p className="text-xl p-4 font-medium">{foodDetail?.description}</p>

            <div className="flex items-center mb-4">
              <button
                onClick={handleDecreaseQuantity}
                className="px-4 py-2 border bg-white text-black rounded-l-lg focus:outline-none"
              >
                -
              </button>
              <span className="px-4 py-2 bg-white text-black">{quantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="px-4 py-2 border bg-white text-black rounded-r-lg focus:outline-none"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="text-xl px-8 cursor-pointer py-2 font-bold hover:bg-yellow-400 bg-emerald-500 text-white rounded-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCategory;
