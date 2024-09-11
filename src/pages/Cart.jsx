import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, removeFromCart } from "../redux-toolkit/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";




const stripePromise = loadStripe(
  "pk_test_51PbgshRohX98q0M7ZGVvXqaURKXdX0bdOWcusBu6npNh3JewajbsOgIK2pz8pZ9pNRHVupESK6lWbeWiCcPr0Vdk00BpyBfg6T"
);

const Cart = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);
  const [clientSecret, setClientSecret] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [calculateTotalAmount, setCalculateTotalAmount] = useState(0);

  useEffect(() => {
    const totalAmount = items.reduce(
      (total, item) => total + item?.product?.price * item?.quantity,
      0
    );
    setCalculateTotalAmount(totalAmount);
  }, [items]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "https://5075-103-180-81-98.ngrok-free.app/payment/Checkout/",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            'ngrok-skip-browser-warning': 'true', 
          },
          body: JSON.stringify({
            amount: calculateTotalAmount,
            currency: "inr",
            payment_method_types: ["card"],
          }),
        }
      );
      const data = await response.json();
      setClientSecret(data.clientSecret);
      setShowCheckout(true);
    } catch (error) {
      console.error("Error fetching client_secret:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="relative min-w-full bg-gray-100 p-8">
      <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 h-full">
          <div className="flex items-center justify-between mb-4 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
          </div>
          <div className="overflow-y-auto h-[455px] px-10">
            {status === "loading" && <p>Loading...</p>}
            {status === "failed" && (
              <p>
                Error:{" "}
                {typeof error === "string" ? error : JSON.stringify(error)}
              </p>
            )}
            {items?.length === 0 ? (
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Your cart is empty
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Add something to your cart to checkout.
                </p>
              </div>
            ) : (
              <div>
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {items?.map((product) => (
                    <li key={product?.product?.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product?.product?.image}
                          alt={product?.product?.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{product?.product?.name.toUpperCase()}</h3>
                            <p className="ml-4">₹{product?.product?.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product?.product?.description}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">
                            Quantity: {product?.quantity}
                          </p>
                          <button
                            type="button"
                            className="font-medium text-red-600 hover:text-red-500"
                            onClick={() => handleRemoveFromCart(product?.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/4 mt-8 md:mt-0 md:ml-6">
          <div className="pt-6">
            <div className="flex justify-between text-xl font-medium text-gray-900">
              <p>Subtotal</p>
              <p>₹{calculateTotalAmount}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes charges are Free.
            </p>
            <div className="mt-6">
              {!showCheckout && (
                <button
                  onClick={handleCheckout}
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </button>
              )}
              {showCheckout && (
                <Elements stripe={stripePromise}>
                  <CheckoutForm clientSecret={clientSecret} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
