import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux-toolkit/accountSlice";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signin = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, error } = useSelector((state) => state.account);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginUser(values))
      .unwrap()
      .then((user) => {
        toast.success("Login successful!");
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        toast.error(`Login failed: ${error}`);
        setSubmitting(false);
      });
  };

  return (
    <div className="h-screen bg-gradient-to-tl from-green-400 to-indigo-900 w-full flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        {isLoading && <p className="text-center text-blue-500">Loading...</p>}
        {isError && <p className="text-center text-red-500">Error: {error}</p>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
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
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
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
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <p className=" mb-4 text-end text-gray-600">
                  
                  <Link
                    to="/forgetPassword"
                    className="text-indigo-500 hover:underline"
                  >
                    Forget Password?
                  </Link>
                </p>
              </div>
              <button
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
