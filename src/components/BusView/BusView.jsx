import CarouselSlider from "../carouseleSlider/CarouselSlider";
import rightBus from "../../assets/search/return_gray.svg";
import leftBus from "../../assets/search/journey.svg";
import { useState } from "react";
import ViewSeats from "../ViewSeats/ViewSeats";
const BusView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSecondOpen, setSecondIsOpen] = useState(false);
  const [isThirdOpen, setThirdIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const secondToggleAccourdion = () => {
    setSecondIsOpen(!isSecondOpen);
  };

  const thirdToggleAccourdion = () => {
    setThirdIsOpen(!isThirdOpen); 
  };
  
  
  return (
    <div className="px-2 bg-slate-100">
      <div className="py-10  bg-rose-200">
        <CarouselSlider />
        <div className="max-w-7xl mx-auto ">
          <div className="grid md:grid-cols-2 justify-between items-center gap-5 mt-3">
            <div>
              <p className="text-[#449d4a]">Departure</p>
              <div className="p-3 ">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-y-2 justify-center">
                  <div className="flex items-center gap-1">
                    <img src={leftBus} alt="" />
                    <div>
                      <h1 className="text-[#089D49] font-semibold  text-xl">
                        Dhaka - Borguna
                      </h1>
                      <p className="">26 March, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-end gap-2">
                    <button className="bg-white px-3 py-1  text-[#089D49]">
                      prev. day
                    </button>
                    <button className="bg-white px-3 py-1  text-[#089D49]">
                      next day
                    </button>
                  </div>
                </div>
                <div></div>
              </div>
            </div>

            <div>
              <p className="text-[#449d4a]">Departure</p>
              <div className="p-3 ">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-y-2 justify-between">
                  <div className="flex items-center gap-1">
                    <img src={rightBus} alt="" />
                    <div>
                      <h1 className=" text-black font-semibold text-xl">
                        Borguna - Dhaka
                      </h1>
                      <p className="">26 March, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-end">
                    <button className="text-white px-3 py-1  bg-[#089D49]">
                      Modify Search
                    </button>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-10">
        <div className="flex justify-between gap-5">
          <div className="bg-primary1 w-3/12">
            <div className="w-full">
              <div className="border border-gray-300 rounded-md">
                <div
                  className="flex justify-between items-center px-4 py-2 cursor-pointer"
                  onClick={toggleAccordion}
                >
                  <span className="text-lg font-medium">Bus Type</span>
                  <svg
                    className={`w-5 h-5 ${
                      isOpen ? "transform rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.293 5.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 7.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {isOpen && (
                  <div className="border-t border-gray-300 px-4 py-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="ac"
                        className="form-checkbox"
                      />
                      <label htmlFor="checkbox1" className="ml-2">
                        AC
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="nonac"
                        className="form-checkbox"
                      />
                      <label htmlFor="checkbox2" className="ml-2">
                        Non AC
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full">
              <div className="border border-gray-300 rounded-md">
                <div
                  className="flex justify-between items-center px-4 py-2 cursor-pointer"
                  onClick={secondToggleAccourdion}
                >
                  <span className="text-lg font-medium">Departure Time</span>
                  <svg
                    className={`w-5 h-5 ${
                      isSecondOpen ? "transform rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.293 5.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 7.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {isSecondOpen && (
                  <div className="border-t border-gray-300 px-4 py-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="before6am"
                        className="form-checkbox"
                      />
                      <label htmlFor="checkbox1" className="ml-2">
                        Before 6:00 AM
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="6to12am"
                        className="form-checkbox"
                      />
                      <label htmlFor="checkbox2" className="ml-2">
                        6:00 AM - 12:00 AM
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="12pxto6pm"
                        className="form-checkbox"
                      />
                      <label htmlFor="checkbox2" className="ml-2">
                        12:00 PM - 6:00 PM
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="after6pm"
                        className="form-checkbox"
                      />
                      <label htmlFor="checkbox2" className="ml-2">
                        After 6:00 PM
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full">
              <div className="border border-gray-300 rounded-md">
                <div
                  className="flex justify-between items-center px-4 py-2 cursor-pointer"
                  onClick={thirdToggleAccourdion}
                >
                  <span className="text-lg font-medium">Arrival Time</span>
                  <svg
                    className={`w-5 h-5 ${
                        isThirdOpen ? "transform rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.293 5.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 7.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {isThirdOpen && (
                  <div className="border-t border-gray-300 px-4 py-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="before6am"
                        className="form-checkbox"
                      />
                      <label htmlFor="checkbox1" className="ml-2">
                        Before 6:00 AM
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="6to12am"
                        className="form-checkbox"
                      />
                      <label htmlFor="checkbox2" className="ml-2">
                        6:00 AM - 12:00 AM
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="12pxto6pm"
                        className="form-checkbox"
                      />
                      <label htmlFor="checkbox2" className="ml-2">
                        12:00 PM - 6:00 PM
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="after6pm"
                        className="form-checkbox"
                      />
                      <label htmlFor="checkbox2" className="ml-2">
                        After 6:00 PM
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-9/12">
            <ViewSeats/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusView;
