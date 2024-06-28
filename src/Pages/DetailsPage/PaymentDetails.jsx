import { useState } from "react";
import bkash from "../../assets/payment/bkash-logo.png"
import nagad from "../../assets/payment/nagad-logo.png"
import rocket from "../../assets/payment/rocket-logo2.svg"
import mfs from "../../assets/payment/mfd.svg"
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PaymentDetails = () => {
  const [agree, setAgree] = useState("");

  return (
    <div className="max-w-7xl mx-auto mt-5 flex gap-4">
      <div className="md:flex-1">
        <div className="bg-primary2 p-2 border-t-[5px] border-t-primary3 rounded-md">
          <h1 className="font-semibold text-xl">Payment Details</h1>
          <hr className="my-2" />
          <div className="border-[1px] border-primary5 p-5">
            <h1 className="text-lg md:text-2xl text-center font-semibold">
              Total Payable Amount:
              <span className="text-primary3">5000/-</span>
            </h1>
          </div>
          <div className="border-[1px] border-primary5 py-5 px-2 mt-2">
            <p className="text-sm text-center">
              By clicking on the, Confirm Reservation / Proceed to Pay box
              below, I have read, acknowledged and agreed to the
              <Link
                to="/conditions"
                className="text-primary3 ml-1 hover:underline"
              >
                Conditions
              </Link>{" "}
              of Masum Computer & Print Zone.
            </p>
          </div>
          <div className="border-[1px] border-primary5 py-5 px-2 mt-2 flex gap-2">
            <input
              onChange={(e) => setAgree(e.target.value)}
              checked={agree === "Agree"}
              type="radio"
              name="Agree"
              className="radio radio-error w-5 h-5"
            />
            <p className="text-sm text-center">
              By clicking on the, Confirm Reservation / Proceed to Pay box
              below, I have read, acknowledged and agreed to the
              <Link
                to="/conditions"
                className="text-primary3 ml-1 hover:underline"
              >
                Conditions
              </Link>{" "}
              of Masum Computer & Print Zone.
            </p>
          </div>
        </div>
      </div>
      <div className="md:flex-1">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-sm py-2 font-semibold leading-5",
                  " focus:outline-none",
                  selected
                    ? "bg-primary3 text-primary4"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Card or Internet banking
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-sm py-2 font-semibold leading-5",
                  " focus:outline-none",
                  selected
                    ? "bg-primary3 text-primary4"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Mobile Banking
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-sm py-2 font-semibold leading-5",
                  " focus:outline-none",
                  selected
                    ? "bg-primary3 text-primary4"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Cash On Delivery
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                "rounded-sm border border-primary3 p-3",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <div className="pt-8 pb-4 text-center">
                <p>Please select a payment system</p>
                <div className="mt-3 flex justify-center items-center gap-2">
                  <button className="w-1/4 h-14 overflow-hidden bg-primary4 py-1 shadow-md">
                    <img src={bkash} className="h-full w-full object-contain" alt="" />
                  </button>
                  <button className="w-1/4 h-14 overflow-hidden bg-primary4 px-3 py-1 shadow-md">
                    <img src={rocket} className="h-full w-full object-contain" alt="" />
                  </button>
                  <button className="w-1/4 h-14 overflow-hidden bg-primary4 py-1 shadow-md">
                    <img src={nagad} className="h-full w-full object-contain" alt="" />
                  </button>
                  <button className="w-1/4 h-14 bg-primary4 py-1 shadow-md flex gap-2 items-center justify-center">
                    <img src={mfs} className="w-8" alt="" />
                    <p className="text-sm font-semibold">Others MFS</p>
                  </button>
                </div>
                <div className="flex justify-center mt-10">
        <button className="bg-primary3 px-3 py-1 border-none text-primary2 font-semibold hover:bg-cardBG duration-300 mt-2 flex">Confirm Booking</button>
        </div>
              </div>
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                "rounded-sm border border-primary3 p-3",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <div className="pt-8 pb-4 text-center">
                  <div className="flex gap-3 justify-center items-center">
                  <FaExclamationTriangle className="text-3xl text-primary3" />
                  <p className="text-primary3 font-semibold text-lg ">This features is not available right now.</p>
                  </div>
              </div>
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                "rounded-sm border border-primary3 p-3",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <div className="pt-8 pb-4 text-center">
                  <div className="flex gap-3 justify-center items-center">
                  <FaExclamationTriangle className="text-3xl text-primary3" />
                  <p className="text-primary3 font-semibold text-lg ">This features is not available right now.</p>
                  </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default PaymentDetails;
