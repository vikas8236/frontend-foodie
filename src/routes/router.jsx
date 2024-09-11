import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SearchItem from "../components/SearchItem";
import App from "../App";
import FoodCategory from "../components/FoodCategory";
// import RestaurantsDetail from "../pages/RestaurantsDetail";
import RestaurantMenu from "../pages/restaurantMenu";
import Signin from "../pages/Signin";
import SignUp from "../pages/SignUp";
import Cart from "../pages/Cart";
import UserProfile from "../pages/UserProfile";
import ForgetPassword from "../components/ForgetPassword";
import CheckoutForm from "../pages/CheckoutForm";
// import Chat from "../pages/Chat";
import VoiceHelpForm from '../pages/voiceHelpForm';
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <SearchItem />,
      },
      {
        path: "/category/:id/",
        element: <FoodCategory />,
      },
      {
        path: "/restaurants/:id/",
        element: <RestaurantMenu />,
      },
      {
        path: "/login",
        element: <Signin />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/profile",
        element: <UserProfile />
      },
      {
        path: "/forgetPassword",
        element: <ForgetPassword/>
      },
      {
        path: "/checkoutForm",
        element: <CheckoutForm />
      },
      // {
      //   path: "/help",
      //   element: <Chat/>
      // },
      {
        path: "/help",
        element: <VoiceHelpForm />
      },
    
    ],
  },
]);

export default routes;
