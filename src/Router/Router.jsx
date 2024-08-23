import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Error from "../shared/Error/Error";
import BusView from '../components/BusView/BusView'
import ViewSeats2 from "../components/ViewSeats/ViewSeats2";
import Home from "../Pages/Home/Home";
import BookingPage from "../components/BookingPage/BookingPage";
import SignUp from "../Pages/Authorization/SignUp/SignUp";
import Gallery from "../Pages/Gallery/Gallery";
import Conditions from "../Pages/Coditions/Conditions";
import Blog from "../Pages/Blog/Blog";
import DetailsPage from "../Pages/DetailsPage/DetailsPage";
import BlogDetails from "../Pages/Blog/BlogDetails";
import Invoice from "../Pages/Invoice/Invoice";
import FindInvoice from "../Pages/FindInvoice/FindInvoice";
import SuccessPage from "../Pages/SuccessPage/SuccessPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      errorElement: <Error/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/gallery",
            element: <Gallery/>
        },
        {
            path: "/conditions",
            element: <Conditions />
        },
        {
            path: "/blog",
            element: <Blog />
        },
        {
            path: "/busView",
            element: <BusView/>
        },
        {
            path: "/viewSeat2",
            element: <ViewSeats2/>
        },
        {
            path: "/bookingPage",
            element: <BookingPage />
        },
        {
            path: "/signUp",
            element: <SignUp />
        },
        {
            path: "/routeDetails",
            element: <DetailsPage />
        },
        {
            path: "/blogDetails/:id",
            element: <BlogDetails />
        },
        {
            path: "/invoice",
            element: <Invoice />
        },
        {
            path: "/findInvoice",
            element: <FindInvoice />
        },
        {
            path: "/successPage",
            element: <SuccessPage />
        }
      ]

    },
  ]);
export default router;