import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo2.png";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { BusProvider } from "../../Provider/BusContext";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import fbTop from "../../assets/banner/facebookTop.jpeg";
import wtTop from "../../assets/banner/whatsAppTop.jpeg";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useContext(BusProvider);
  const whatsappNumber = "+8801868242527";

  const handleLogout = async () => {
    setLoading(true);
    const res = await axiosPublic("/api/logout");
    if (res.data) {
      toast.success("User Log Out Successful");
      navigate("/");
      setLoading(false);
      window.location.reload();
    }
  };
  return (
    <div className="bg-primary2 text-primary1 sticky top-0 z-20">
      <div className="bg-primary3">
        <div className="max-w-7xl mx-auto text-primary4 md:px-5">
          <div className="flex gap-3 justify-end items-center">
            <a
              href="https://www.facebook.com/printzone2000?mibextid=ZbWKwL"
              target="_blank"
              className=""
            >
              {/* <img src={fbTop} className="h-7" alt="" /> */}
              <div className="flex items-center gap-2 bg-fbColor p-2 h-full">
                <FaFacebook className="text-3xl md:text-2xl" />
                <h1 className="text-xs md:text-sm">
                  ফেসবুকে নতুন নতুন আপডেট পেতে ক্লিক করুন
                </h1>
              </div>
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              className=""
            >
              {/* <img src={wtTop} className="h-7" alt="" /> */}
              <div className="flex items-center gap-2 bg-wtColor p-2">
                <IoLogoWhatsapp className="text-3xl md:text-2xl" />
                <h1 className="text-xs md:text-sm">
                  হোয়াটসঅ্যাপের মাধ্যমে বুকিং দিতে ক্লিক করুন
                </h1>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="py-3 px-2 md:px-4 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-20">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-0 shadow bg-primary2 rounded-md w-52"
            >
              <li>
                <NavLink className="text-md rounded-sm" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="text-md rounded-sm" to="/findInvoice">
                  Find Invoice
                </NavLink>
              </li>
              <li>
                <NavLink className="text-md rounded-sm" to="/gallery">
                  Gallery
                </NavLink>
              </li>
              <li>
                <NavLink className="text-md rounded-sm" to="/blog">
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink className="text-md rounded-sm" to="/conditions">
                  Conditions
                </NavLink>
              </li>
              <li>
                <a
                  href="https://backend.admissionbus.com/admin/dashboard"
                  target="_blank"
                  className="bg-secondary1 bg-opacity-30 rounded-sm"
                >
                  <button className="text-md font-semibold">Admin Login</button>
                </a>
              </li>
            </ul>
          </div>
          <img src={logo} alt="" className="w-20" />
        </div>
        {/* ===================================================Navbar end ====================================== */}
        <div className=" hidden lg:flex">
          <ul className="menu menu-horizontal px-1 items-center space-x-3">
            <li>
              <NavLink className="text-md rounded-sm" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="text-md rounded-sm" to="/findInvoice">
                Find Invoice
              </NavLink>
            </li>
            <li>
              <NavLink className="text-md rounded-sm" to="/gallery">
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink className="text-md rounded-sm" to="/blog">
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink className="text-md rounded-sm" to="/conditions">
                Conditions
              </NavLink>
            </li>
            <li>
              <a
                href="https://backend.admissionbus.com/admin/dashboard"
                target="_blank"
                className="bg-secondary1 bg-opacity-30 rounded-sm"
              >
                <button className="text-md font-semibold">Admin Login</button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
