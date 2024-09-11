import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux-toolkit/cartSlice";
import { toast } from "react-toastify";

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: "John Doe", // You can dynamically get the name from the form
          address: {
            postal_code: "12345", // Replace with dynamic value if needed
          },
        },
      },
    });
    console.log("stripe signature:",result)

    if (result.error) {
      console.error("Payment failed:", result.error.message);
      setPaymentError(result.error.message);
      setPaymentSuccess(false);
    } else {
      console.log("Payment successful:", result.paymentIntent);
      setPaymentSuccess(true);
      setPaymentError(null);

      // Send payment success status to backend
      // sendPaymentStatusToBackend("succeed");

      // Optionally clear cart and navigate to home
      dispatch(clearCart()).then(() => {
        navigate("/");
      });
    }
  };

  // const sendPaymentStatusToBackend = async (status) => {
  //   try {
  //     const response = await fetch("http://192.168.1.10.:8000/payment/status/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${localStorage.getItem("token")}`, // Example for authorization header
  //       },
  //       body: JSON.stringify({ status }),
  //     });
  //     if (response.ok) {
  //       console.log("Payment status sent to backend successfully.");
  //       // Handle further actions on success
  //     } else {
  //       console.error("Failed to send payment status to backend.");
  //       // Handle error case
  //     }
  //   } catch (error) {
  //     console.error("Error sending payment status to backend:", error);
  //     // Handle network or other errors
  //   }
  // };

  if (paymentSuccess) {
    toast.success("Payment done successfully !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  if (paymentError) {
    toast.error(paymentError, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Card details:
      </label>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#AAB7C4",
              },
            },
            invalid: {
              color: "#9E2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
