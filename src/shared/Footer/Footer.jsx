import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.jpeg";
import { IoTicketSharp } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import { MdAddCall } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-primary2 pt-4 md:pt-10 mt-5">
      <div className="max-w-7xl mx-auto footer text-xl text-primary1 md:flex px-2">
        <aside className="md:flex-1 flex flex-col items-center md:items-start">
          <img src={logo} className="w-32" alt="" />
          <p className="text-sm text-center md:text-left">
            <span className="text-2xl font-semibold -mt-1 block mb-3">
              Masum Computer & Print Zone
            </span>
            <span>
            বিশ্ববিদ্যালয় ভর্তি পরিক্ষার্থীদের জন্য বাস সার্ভিসের বিশ্বস্ত প্রতিষ্ঠান। ২০১৭ সাল থেকে আমরা সেবা দিয়ে যাচ্ছি।
            </span>
          </p>
        </aside>
        <nav className="md:flex-1">
          <h6 className="footer-title">Contact</h6>
          <a
            href="https://www.facebook.com/printzone2000?mibextid=ZbWKwL"
            className="link link-hover"
          >
            Concrit Bhaban, (Near Sadia's Kitchen), Shop No-03, 166/68 No
            College Road, Chawkbazar, Chittagong, Bangladesh
          </a>
          <a className="mt-4">
            <span className="font-semibold">Email address</span>
            <p className="link link-hover mt-2">Email-prinzone202@gmail.com</p>
          </a>
          <a className="mt-4">
            <span className="font-semibold">Phone Number</span>
            <p className="link link-hover mt-2">
              +880 1575 690678, +880 1868 242527
            </p>
          </a>
        </nav>
        <div className="md:flex-1 md:flex justify-center">
          <nav>
            <h6 className="footer-title">Important Link</h6>
            <div className="flex flex-col gap-3">
              <Link to='/gallery'>Gallery</Link>
              <Link to='/blog'>Blog</Link>
              <Link to="/conditions">Conditions</Link>
            </div>
          </nav>
        </div>
        <div className="md:flex-1 md:flex justify-center">
          <nav>
            <h6 className="footer-title">Offline Ticket Counter</h6>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <IoTicketSharp className="text-primary1" />
                <span className="text-sm">
                  মাসুম কম্পিউটার এন্ড প্রিন্ট জোন।
                </span>
              </div>
              <div className="flex gap-2">
                <IoLocation className="text-primary1 md:text-4xl" />
                <span className="text-sm">
                কংক্রিট ভবন(নীচ তলা), দোকান নং-৩, (সাদিয়া'স কিচেনের পাশে) ১৬৬/৬৮ নং কলেজ রোড, চকবাজার, চট্টগ্রাম। 
                </span>
              </div>
              <h6 className="footer-title">Offline Ticket Counter</h6>
              <div className="flex gap-2">
                <IoTicketSharp className="text-primary1" />
                <span className="text-sm">
                বুশরা কম্পিউটার এন্ড প্রিন্টার্স।
                </span>
              </div>
              <div className="flex gap-2">
                <IoLocation className="text-primary1 md:text-4xl" />
                <span className="text-sm">
                ঠিকানাঃ গুলজারের মোর, আব্দুল মোতালেব মার্কেটের নিচ তলা (১ম দোকান), চকবাজার, চট্টগ্রাম।
                </span>
              </div>
              <div className="flex gap-2">
                <MdAddCall className="text-primary1 md:text-xl" />
                <span className="text-sm">
                ০১৮৪২-১৯১৯১৯, ০১৯৫২-১৯১৯১৯
                </span>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="bg-secondary1 bg-opacity-30 mt-10 px-2">
        <div className="max-w-7xl mx-auto py-5 text-primary1 md:flex justify-between">
          <p>Copyright © 2024 - All right reserved by Masum Computer & Print Zone</p>
          <p>
            <span>Design & Develop by</span>
            <a href="#" className="underline ml-2">
              WB Softwares
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
