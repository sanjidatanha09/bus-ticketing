import { useContext, useState } from "react";
import BtnLoader from "../../Utils/Loader/BtnLoader";
import { FaInfoCircle } from "react-icons/fa";
import { BusProvider } from "../../Provider/BusContext";
import Invoice from "../Invoice/Invoice";

const FindInvoice = () => {
  const [loading, setLoading] = useState(false);
  const {setSearchTicket} = useContext(BusProvider);
  const [search, setSearch] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const pnr = e.target.pnr.value
    const contact_number = e.target.phone.value
    setSearchTicket({pnr, contact_number})
    setSearch(true)
    e.target.reset()
    setLoading(false)
  };
  return (
    <div className="md:flex gap-4 max-w-7xl mx-auto">
      <div className="md:w-3/12 min-h-[calc(100vh-110px)] bg-primary2 py-7 px-2">
        <h1 className="text-xl font-semibold text-primary3">
          Find Your Ticket
        </h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              PNR
              <span className="text-xs text-cardBG">(require)</span>
            </label>
            <input
              type="text"
              name="pnr"
              className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm focus:outline-none block w-full p-2.5"
              placeholder="Enter PNR Number"
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Contact Number
              <span className="text-xs text-cardBG">(require)</span>
            </label>
            <input
              type="number"
              name="phone"
              className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm focus:outline-none block w-full p-2.5"
              placeholder="Enter Contact Number"
              required
            />
          </div>
          <button className="bg-primary3 px-3 py-1 border-none text-primary2 font-semibold hover:bg-cardBG duration-300 mt-2 flex">
            {loading ? <BtnLoader /> : "Search Ticket"}
          </button>
        </form>
      </div>
      <div className="md:w-9/12 py-7">
        {!search ? <div className="border py-3 px-10 flex flex-col items-center">
          <FaInfoCircle className="text-4xl text-primary3" />
          <p className="mt-4 font-semibold text-center text-primary5">
            If you have a confirmed ticket booked, please enter your ticket PNR
            and you can get it printed, SMSed or emailed from this panel.
          </p>
          <p className="mt-4 font-semibold text-center text-primary5">
            In case you have reserved a ticket through bKash and want to confirm
            your bKash transaction ID to get your confirmed ticket, please enter
            your Reservation Reference ID.
          </p>
        </div> : <Invoice />}
      </div>
    </div>
  );
};

export default FindInvoice;
