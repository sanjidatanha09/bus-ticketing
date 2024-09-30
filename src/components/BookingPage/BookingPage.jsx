import { useContext, useEffect, useState } from "react";
import { BusProvider } from "../../Provider/BusContext";
import ShowBusCard from "../ViewSeats/ShowBusCard";
import Loader from "../../Utils/Loader/Loader";
import useGetTrip from "../../Hooks/useGetTrip";

const BookingPage = () => {
  const { trip } = useContext(BusProvider);
  const [showSeat, setShowSeat] = useState(null);
  const { trips, loading, errMessage } = useGetTrip(trip && trip);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const togglePopOpen = (idx) => {
    setShowSeat((prevIdx) => (prevIdx === idx ? null : idx));
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="max-w-7xl mx-auto mt-10">
        <div className="md:flex px-4 font-semibold hidden ">
          <h1 className="w-4/12">Operator(Bus Type)</h1>
          <h1 className="w-2/12">Dep. Time</h1>
          <h1 className="w-2/12">Arr. Time</h1>
          <h1 className="w-2/12">Seats Available</h1>
          <h1 className="w-2/12">Fare</h1>
        </div>
        <p className="text-lg my-3 text-cardBG font-semibold text-center">
          {errMessage}
        </p>
        {trips?.map((item, idx) => (
          <div key={idx} className="bg-primary2 px-4 py-3 rounded-md mt-2">
            <ShowBusCard
              setShowSeat={setShowSeat}
              showSeat={showSeat}
              togglePopOpen={togglePopOpen}
              busList={item}
              idx = {idx}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
