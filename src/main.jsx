import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import BusContext from "./Provider/BusContext.jsx";
import router from "./Router/Router.jsx";
import "flatpickr/dist/themes/material_green.css";
import { Toaster } from "react-hot-toast";
import 'react-tabs/style/react-tabs.css';
import ScrollToTop from "./Utils/ScrollToTop/ScrollToTop";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BusContext>
    <Toaster />
      <RouterProvider router={router}> 
        <ScrollToTop />
      </RouterProvider>
    </BusContext>
  </React.StrictMode>
);
