import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  sendOTP,
  resendOTP,
  resetPassword,
  setTimer,
  setTimerOn,
} from "../redux-toolkit/forgetPasswordSlice";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otpSent, timer, timerOn, isLoading } = useSelector(
    (state) => state.forgetPassword
  );

  const initialValues = {
    email: "",
    otp: "",
    new_password: "",
    re_new_password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    otp: Yup.string()
      .matches(/^[0-9]+$/, "OTP must be a 4-digit number")
      .length(4, "OTP must be exactly 4 digits")
      .required("OTP is required"),
    new_password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    re_new_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  useEffect(() => {
    if (timerOn && timer > 0) {
      const interval = setInterval(() => {
        dispatch(setTimer(timer - 1));
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      dispatch(setTimerOn(false));
    }
  }, [dispatch, timerOn, timer]);

  const handleGetOTP = (email) => {
    dispatch(sendOTP(email));
    dispatch(setTimer(60));
    dispatch(setTimerOn(true));
  };

  const handleResendOTP = (email) => {
    dispatch(resendOTP(email));
    dispatch(setTimer(60));
    dispatch(setTimerOn(true));
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(resetPassword(values)).then((action) => {
      if (resetPassword.fulfilled.match(action)) {
        navigate("/login");
      } else {
        setSubmitting(false);
      }
    });
  };

  return (
    <div className="h-screen bg-gradient-to-tl from-green-400 to-indigo-900 w-full flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reset Password
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className="mb-4 flex justify-between items-center w-full">
                <Field
                  className="w-3/4 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <button
                  type="button"
                  className="bg-indigo-500 w-1/4 text-white py-2 px-3 rounded-r-lg hover:bg-indigo-600 transition-colors duration-300"
                  onClick={() => handleGetOTP(values.email)}
                  disabled={otpSent || isLoading}
                >
                  Get OTP
                </button>
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm m-2"
              />
              {otpSent && (
                <>
                  <div className="mb-4">
                    <Field
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      type="text"
                      name="otp"
                      placeholder="OTP"
                    />
                    <ErrorMessage
                      name="otp"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    {timerOn ? (
                      <p className="text-gray-700 text-xs mt-1">
                        Resend OTP in {timer} seconds
                      </p>
                    ) : (
                      <button
                        type="button"
                        className="text-indigo-600 hover:text-indigo-800 text-xs mt-1"
                        onClick={() => handleResendOTP(values.email)}
                        disabled={isLoading}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                  <div className="mb-4">
                    <Field
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      type="password"
                      name="new_password"
                      placeholder="New Password"
                    />
                    <ErrorMessage
                      name="new_password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      type="password"
                      name="re_new_password"
                      placeholder="Re-enter Password"
                    />
                    <ErrorMessage
                      name="re_new_password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                disabled={isSubmitting || !otpSent || isLoading}
              >
                Change Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgetPassword;
