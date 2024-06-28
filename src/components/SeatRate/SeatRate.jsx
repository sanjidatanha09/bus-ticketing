/* eslint-disable react/prop-types */

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BusProvider } from "../../Provider/BusContext";
import toast from "react-hot-toast";

const SeatRate = ({ seat, price, busClass, getPassenger }) => {
    const seatPrice = seat.length * price
    const navigate = useNavigate();
    const {setBookingInfo} = useContext(BusProvider);

    const handleBooking = () => {
      if(seat.length === 0){
        return toast.error('you have no booked seat')
      }
      else{
        setBookingInfo(getPassenger)
        navigate('/routeDetails')
      }
    }

  return (
    <div className="">
      <div className="flex mb-2 justify-between">
        <div>
          <h3 className="text-xl text-black">Seat</h3>
        </div>
        <div>
          <h3 className="text-xl text-black">Class</h3>
        </div>
        <div>
          <h3 className="text-xl text-black">Fare</h3>
        </div>
      </div>
      <hr />
      {seat?.map((item, idx) => (
        <div key={idx} className="flex mt-2 justify-between">
          <div>
            <h3 className="text-secondary1 ">{item.seat_no}</h3>
          </div>
          <div>
            <h3 className="text-secondary1">{busClass}</h3>
          </div>
          <div>
            <h3 className="text-secondary1">{price}</h3>
          </div>
        </div>
      ))}

      {/* card */}
      <div className="border flex justify-between w-full p-2 mt-8">
        <h3 className="text-[#079D49]">
          Total Seat: <span className="font-bold">{seat?.length || ""}</span>
        </h3>
        <h3 className="text-[#079D49]">
          Total Amount: <span className="font-bold">{seatPrice || "00"}</span>
        </h3>
      </div>

      {/* selector */}
      <div className="flex justify-end mt-4">
        <button onClick={handleBooking} className="bg-primary3 px-3 py-1 border-none text-primary2 font-semibold hover:bg-cardBG duration-300">
          Continue
        </button>
      </div>
    </div>
  );
};

export default SeatRate;
