import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../redux-toolkit/accountSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.account);
  console.log("userRegister:--------", user);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    password: "",
    profileImg: null,
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile_no: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must be digits only"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    profileImg: Yup.mixed().test("fileSize", "File size too large", (value) => {
        if (!value) return true; // allow empty values
        return value.size <= 1024 * 1024 * 2; // 2MB limit
      })
      .test("fileType", "Unsupported file type", (value) => {
        if (!value) return true; // allow empty values
        return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      })
      .required("Image is required"),
  });

  const handleSubmitImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "userImage");
    data.append("cloud_name", "dxeqwilsn");

    console.log("data: ", data);

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxeqwilsn/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      console.log("result: ", result.url);
      return result.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const imageUrl = await handleSubmitImage(values.profileImg);
      const userData = { ...values, profileImg: imageUrl };
      console.log(userData);
      await dispatch(registerUser(userData)).unwrap();
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
    resetForm();
  };

  return (
    <div className="h-screen bg-gradient-to-tl from-green-400 to-indigo-900 w-full flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form encType="multipart/form-data">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="first_name"
                >
                  First Name
                </label>
                <Field
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  type="text"
                  name="first_name"
                  placeholder="Enter First Name"
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="last_name"
                >
                  Last Name
                </label>
                <Field
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  type="text"
                  name="last_name"
                  placeholder="Enter Last Name"
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="mobile_no"
                >
                  Phone Number
                </label>
                <Field
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  type="text"
                  name="mobile_no"
                  placeholder="Enter Your Phone Number"
                />
                <ErrorMessage
                  name="mobile_no"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="profileImg"
                >
                  Upload Image
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  type="file"
                  accept="image/*"
                  name="profileImg"
                  onChange={(e) =>
                    setFieldValue("profileImg", e.target.files[0])
                  }
                />
                <ErrorMessage
                  name="profileImg"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                type="submit"
                disabled={isSubmitting}
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
