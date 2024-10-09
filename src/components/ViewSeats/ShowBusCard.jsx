/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import SeatRate from "../SeatRate/SeatRate";
import { PiArrowFatLinesLeftLight, PiEngineFill } from "react-icons/pi";
import { TbSteeringWheel } from "react-icons/tb";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { BusProvider } from "../../Provider/BusContext";
import toast from "react-hot-toast";

const seatPlan = {
  busClass : "Normal",
  A1: {
    seat_number: "A1",
    seat_class: "Normal",
  },
  A2: {
    seat_number: "A2",
    seat_class: "Normal",
  },
  A3: {
    seat_number: "A3",
    seat_class: "Normal",
  },
  A4: {
    seat_number: "A4",
    seat_class: "Normal",
  },
  B1: {
    seat_number: "B1",
    seat_class: "Normal",
  },
  B2: {
    seat_number: "B2",
    seat_class: "Normal",
  },
  B3: {
    seat_number: "B3",
    seat_class: "Normal",
  },
  B4: {
    seat_number: "B4",
    seat_class: "Normal",
  },
  C1: {
    seat_number: "C1",
    seat_class: "Normal",
  },
  C2: {
    seat_number: "C2",
    seat_class: "Normal",
  },
  C3: {
    seat_number: "C3",
    seat_class: "Normal",
  },
  C4: {
    seat_number: "C4",
    seat_class: "Normal",
  },
  D1: {
    seat_number: "D1",
    seat_class: "Normal",
  },
  D2: {
    seat_number: "D2",
    seat_class: "Normal",
  },
  D3: {
    seat_number: "D3",
    seat_class: "Normal",
  },
  D4: {
    seat_number: "D4",
    seat_class: "Normal",
  },
  E1: {
    seat_number: "E1",
    seat_class: "Normal",
  },
  E2: {
    seat_number: "E2",
    seat_class: "Normal",
  },
  E3: {
    seat_number: "E3",
    seat_class: "Normal",
  },
  E4: {
    seat_number: "E4",
    seat_class: "Normal",
  },
  F1: {
    seat_number: "F1",
    seat_class: "Normal",
  },
  F2: {
    seat_number: "F2",
    seat_class: "Normal",
  },
  F3: {
    seat_number: "F3",
    seat_class: "Normal",
  },
  F4: {
    seat_number: "F4",
    seat_class: "Normal",
  },
  G1: {
    seat_number: "G1",
    seat_class: "Normal",
  },
  G2: {
    seat_number: "G2",
    seat_class: "Normal",
  },
  G3: {
    seat_number: "G3",
    seat_class: "Normal",
  },
  G4: {
    seat_number: "G4",
    seat_class: "Normal",
  },
  H1: {
    seat_number: "H1",
    seat_class: "Normal",
  },
  H2: {
    seat_number: "H2",
    seat_class: "Normal",
  },
  H3: {
    seat_number: "H3",
    seat_class: "Normal",
  },
  H4: {
    seat_number: "H4",
    seat_class: "Normal",
  },
  I1: {
    seat_number: "I1",
    seat_class: "Normal",
  },
  I2: {
    seat_number: "I2",
    seat_class: "Normal",
  },
  I3: {
    seat_number: "I3",
    seat_class: "Normal",
  },
  I4: {
    seat_number: "I4",
    seat_class: "Normal",
  },
  J1: {
    seat_number: "J1",
    seat_class: "Normal",
  },
  J2: {
    seat_number: "J2",
    seat_class: "Normal",
  },
  J3: {
    seat_number: "J3",
    seat_class: "Normal",
  },
  J4: {
    seat_number: "J4",
    seat_class: "Normal",
  },
  J5: {
    seat_number: "J5",
    seat_class: "Normal",
  },
  K1: {
    seat_number: "K1",
    seat_class: "Normal",
  },
  K2: {
    seat_number: "K2",
    seat_class: "Normal",
  },
  K3: {
    seat_number: "K3",
    seat_class: "Normal",
  },
  K4: {
    seat_number: "K4",
    seat_class: "Normal",
  },
  K5: {
    seat_number: "K5",
    seat_class: "Normal",
  },
};

const ShowBusCard = ({ setShowSeat, showSeat, busList, togglePopOpen, idx }) => {
  const [seat, setBusSeat] = useState([]);
  const [seconds, setSeconds] = useState(480000);
  const [tempBusSeat, setTempBusSeat] = useState([]);
  const [allSeatInfo, setAllSeatInfo] = useState(null);
  const { user } = useContext(BusProvider);
  const axiosPublic = useAxiosPublic();
  const [timer, setTimer] = useState("00:08:00");
  const Ref = useRef(null);


  const {
    id,
    trip_name,
    seat_price,
    deperture_date,
    return_date,
    return_time,
    exam_date,
    deperture_time,
    arrival_time,
    bus_type_data,
    bus_data,
    seat_plan_to_data
  } = busList.getFilterBusList;
    
 
    const getTimeRemaining = (e) => {
        const total =
            Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor(
            (total / 1000 / 60) % 60
        );
        const hours = Math.floor(
            (total / 1000 / 60 / 60) % 24
        );
        return {
            total,
            hours,
            minutes,
            seconds,
        };
    };
    
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } =
            getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : "0" + hours) +
                ":" +
                (minutes > 9
                    ? minutes
                    : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };
 
    const clearTimer = (e) => {
        setTimer("00:08:00");
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };
 
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 480);
        return deadline;
    };
 
    useEffect(() => {
      localStorage.setItem('time', false)
    }, [])


  // Fetch final booked all seat
  const fetchSeatList = async () => {
   try {
    const res = await axiosPublic(`/api/get-seat-list-with-route/${id}`);
    if (res.data.status_code === 201) {
      setBusSeat(res.data.getBookedSeatNo);
      setAllSeatInfo(res.data);
    }
   } catch (error) { toast.error(error.response.data.message) }
  };

  useEffect(() => {
    fetchSeatList();
  }, []);

  //close final booked all seat

  const getPassenger = {
    ticketing_unique_id: allSeatInfo?.ticketingUniqueId,
    trip_id: id,
    // user_id: user?.id,
  };

  const setSeat = (booking) => {
    const seatBookingInfo = {
      ticketing_unique_id: allSeatInfo.ticketingUniqueId,
      trip_id: id,
      seat_no: booking.seat_number,
    };

    const checkOthersUserBooking = seat.find(item => item.seat_no === booking.seat_number)
    if(checkOthersUserBooking){
      return toast.error('seat is already booked')
    }
    const totalBookedSeatsCount = tempBusSeat.length;

    // Check if the total booked seats have reached the limit of 6
    if (totalBookedSeatsCount >= 6) {
      return toast.error("The maximum limit of 6 seats has been reached. No more bookings can be made.");
    }
  
   
    const filter = tempBusSeat.find(
      (item) => booking.seat_number === item.seat_no
    );

    // check is seat already booking? delete booked seat another click
    if (filter) {
      try {   
        axiosPublic.post("/api/delete-seat-form-booking", seatBookingInfo)
        .then(res => {
          if(res.data.status_code === 201){
            setTempBusSeat(res.data.getUserTicketData)
            toast.success('seat cancel successful')
          }
        })
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    // otherwise added temporary booking 
    else{
       const addedTempBooking = async () => {
        try {
          const res = await axiosPublic.post("/api/add-new-seat-for-booking", seatBookingInfo)
          if (res.data.status_code === 201) {
            setTempBusSeat(res.data.getUserTicketData);
            toast.success('seat book successful')

            const checkTimeOut = localStorage.getItem('time')
            if(checkTimeOut == "false"){
              localStorage.setItem('time', true)
              clearTimer(getDeadTime());
            }

            setTimeout(() => {
              localStorage.setItem('time', false)
              axiosPublic.post("/api/delete-seat-form-booking", seatBookingInfo)
                .then(res => {
                  if(res.data.status_code === 201){
                    setTempBusSeat(res.data.getUserTicketData)
                    toast.success('seat cancel successful')
                  }
                })
            }, seconds);
          } else {
            toast.error("Something went wrong.");
          }
        } catch (error) {
          toast.error(error.response.data.message)
        }
       }
       addedTempBooking()
    }
  };




  return (
    <div>
      <div className="flex flex-col md:flex-row relative">
        <div className="md:w-4/12">
          <h1 className="text-2xl text-primary3 font-bold">{trip_name}</h1>

          <h1 className="text-black mt-3 text-xl font-semibold">
            <span className="font-semibold mr-1">Bus Name: </span>
            <span className="text-cardBG">{bus_data.bus_name}</span>
          </h1>
          <h1 className="text-black">
            <span className="font-semibold mr-1">Type: </span>
            {bus_type_data.type_name}
          </h1>
          <h1 className="text-black">
            <span className="font-semibold mr-1">Starting Point:</span>
            {busList?.getBoardingPoint.map((start, idx) => (
              <span key={idx}>{start.point_name}</span>
            ))}
          </h1>
          <h1 className="text-black">
            <span className="font-semibold mr-1">End Point:</span>{" "}
            {busList?.getDroppingPoint.map((start, idx) => (
              <span key={idx}>{start.point_name}</span>
            ))}
          </h1>
          <h1 className="text-black">
            <span className="font-semibold mr-1">Journey Date:</span>{" "}
            {deperture_date}
          </h1>
          <h1 className="text-black">
            <span className="font-semibold mr-1">Exam Date:</span>{" "}
            {exam_date}
          </h1>
          <h1 className="text-black">
            <span className="font-semibold mr-1">Return Date:</span>{" "}
            {return_date}
          </h1>
          <h1 className="text-black">
            <span className="font-semibold mr-1">Return Time:</span>{" "}
            {return_time}
          </h1>
          <h1 className="text-black">
            <span className="font-semibold mr-1">Arr. Time:</span>{" "}
            {arrival_time}
          </h1>
          <h1 className="text-black">
            <span className="font-semibold mr-1">Dep Time:</span>{" "}
            {deperture_time}
          </h1>
        </div>
        <div className="md:w-2/12">
          <h1 className=" text-green-700 font-bold"><span className="md:hidden">Journey Time:</span> {deperture_time}</h1>
        </div>
        <div className="md:w-2/12">
          <h1 className=" text-green-700 font-bold"><span className="md:hidden">Return Time:</span> {arrival_time}</h1>
        </div>
        <div className="md:w-2/12">
          <h1 className=" text-green-700 font-bold"><span className="md:hidden">Seat Available: </span>{seat_plan_to_data?.plan_name - seat.length}</h1>
        </div>
        <div className="md:w-2/12">
          <h1 className=" text-green-700 font-bold"><span className="md:hidden">Fare:</span> {seat_price}/-</h1>
        </div>
        <div className="absolute bottom-0 right-24">
          <button
            onClick={() => togglePopOpen(idx)}
            className="bg-primary3 text-primary2 font-semibold px-4 py-1 rounded-sm hover:bg-cardBG duration-300"
          >
            {showSeat === idx ? "Hide Seat" : "See Seat"}
          </button>
        </div>
      </div>
      <div className="w-full h-[2px] my-2 bg-primary5"></div>
      {/* ========= Seat Plan ========= */}
      <div
        className={`${
          showSeat === idx ? "flex flex-col md:flex-row" : "hidden"
        } duration-300 mt-3 max-w-7xl mx-auto`}
      >
        <div className="md:w-2/3 md:flex md:justify-end mt-6">
        <div className="text-sm font-semibold flex flex-col items-center">
          <p className="text-primary3 px-3 md:px-14 text-center">
          বুকিং এ ক্লিক করার পর থেকে ৮ মিনিটের মধ্যে বুকিং কনফার্ম করতে হবে অন্যথায় বুকিং বাতিল হয়ে যাবে।
          </p>
            <h1 className="text-primary3 ml-2 text-2xl mt-2 border max-w-fit px-4 py-1">{timer}</h1> 
            </div>
            <div className="w-60 bg-primary4 p-4 space-y-2">
            <div className="flex justify-between">
              <div>
                <PiArrowFatLinesLeftLight className="text-3xl text-primary3" />
              </div>
              <div className="flex flex-col items-center">
                <PiEngineFill className="text-2xl text-primary3" />
                <p className="text-[8px] -mt-1">Engin</p>
              </div>
              <div className="flex flex-col items-center">
                <TbSteeringWheel className="text-3xl text-primary3" />
                <p className="text-[8px] -mt-1">Driver</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.A1)}
                  className={`${
                    seat.find((item) => item=== "A1") ||
                    tempBusSeat.find((item) => item.seat_no === "A1")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  A1
                </button>
                {seat_plan_to_data?.plan_name !== "40" && <button
                  onClick={() => setSeat(seatPlan.A2)}
                  className={`${
                    seat.find((item) => item === "A2") ||
                    tempBusSeat.find((item) => item.seat_no === "A2")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  A2
                </button>}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.A3)}
                  className={`${
                    seat.find((item) => item === "A3") ||
                    tempBusSeat.find((item) => item.seat_no === "A3")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  A3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.A4)}
                  className={`${
                    seat.find((item) => item === "A4") ||
                    tempBusSeat.find((item) => item.seat_no === "A4")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  A4
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.B1)}
                  className={`${
                    seat.find((item) => item === "B1") ||
                    tempBusSeat.find((item) => item.seat_no === "B1")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  B1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.B2)}
                  className={`${
                    seat.find((item) => item === "B2") ||
                    tempBusSeat.find((item) => item.seat_no === "B2")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  B2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.B3)}
                  className={`${
                    seat.find((item) => item === "B3") ||
                    tempBusSeat.find((item) => item.seat_no === "B3")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  B3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.B4)}
                  className={`${
                    seat.find((item) => item === "B4") ||
                    tempBusSeat.find((item) => item.seat_no === "B4")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  B4
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.C1)}
                  className={`${
                    seat.find((item) => item === "C1") ||
                    tempBusSeat.find((item) => item.seat_no === "C1")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  C1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.C2)}
                  className={`${
                    seat.find((item) => item === "C2") ||
                    tempBusSeat.find((item) => item.seat_no === "C2")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  C2 
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.C3)}
                  className={`${
                    seat.find((item) => item === "C3") ||
                    tempBusSeat.find((item) => item.seat_no === "C3")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  C3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.C4)}
                  className={`${
                    seat.find((item) => item === "C4") ||
                    tempBusSeat.find((item) => item.seat_no === "C4")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  C4
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.D1)}
                  className={`${
                    seat.find((item) => item === "D1") ||
                    tempBusSeat.find((item) => item.seat_no === "D1")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  D1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.D2)}
                  className={`${
                    seat.find((item) => item === "D2") ||
                    tempBusSeat.find((item) => item.seat_no === "D2")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  D2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.D3)}
                  className={`${
                    seat.find((item) => item === "D3") ||
                    tempBusSeat.find((item) => item.seat_no === "D3")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  D3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.D4)}
                  className={`${
                    seat.find((item) => item === "D4") ||
                    tempBusSeat.find((item) => item.seat_no === "D4")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  D4
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.E1)}
                  className={`${
                    seat.find((item) => item === "E1") ||
                    tempBusSeat.find((item) => item.seat_no === "E1")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  E1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.E2)}
                  className={`${
                    seat.find((item) => item === "E2") ||
                    tempBusSeat.find((item) => item.seat_no === "E2")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  E2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.E3)}
                  className={`${
                    seat.find((item) => item === "E3") ||
                    tempBusSeat.find((item) => item.seat_no === "E3")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  E3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.E4)}
                  className={`${
                    seat.find((item) => item === "E4") ||
                    tempBusSeat.find((item) => item.seat_no === "E4")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  E4
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.F1)}
                  className={`${
                    seat.find((item) => item === "F1") ||
                    tempBusSeat.find((item) => item.seat_no === "F1")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  F1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.F2)}
                  className={`${
                    seat.find((item) => item === "F2") ||
                    tempBusSeat.find((item) => item.seat_no === "F2")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  F2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.F3)}
                  className={`${
                    seat.find((item) => item === "F3") ||
                    tempBusSeat.find((item) => item.seat_no === "F3")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  F3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.F4)}
                  className={`${
                    seat.find((item) => item === "F4") ||
                    tempBusSeat.find((item) => item.seat_no === "F4")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  F4
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.G1)}
                  className={`${
                    seat.find((item) => item === "G1") ||
                    tempBusSeat.find((item) => item.seat_no === "G1")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  G1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.G2)}
                  className={`${
                    seat.find((item) => item === "G2") ||
                    tempBusSeat.find((item) => item.seat_no === "G2")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  G2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.G3)}
                  className={`${
                    seat.find((item) => item === "G3") ||
                    tempBusSeat.find((item) => item.seat_no === "G3")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  G3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.G4)}
                  className={`${
                    seat.find((item) => item === "G4") ||
                    tempBusSeat.find((item) => item.seat_no === "G4")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  G4
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.H1)}
                  className={`${
                    seat.find((item) => item === "H1") ||
                    tempBusSeat.find((item) => item.seat_no === "H1")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  H1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.H2)}
                  className={`${
                    seat.find((item) => item === "H2") ||
                    tempBusSeat.find((item) => item.seat_no === "H2")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  H2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.H3)}
                  className={`${
                    seat.find((item) => item === "H3") ||
                    tempBusSeat.find((item) => item.seat_no === "H3")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  H3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.H4)}
                  className={`${
                    seat.find((item) => item === "H4") ||
                    tempBusSeat.find((item) => item.seat_no === "H4")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  H4
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.I1)}
                  className={`${
                    seat.find((item) => item === "I1") ||
                    tempBusSeat.find((item) => item.seat_no === "I1")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  I1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.I2)}
                  className={`${
                    seat.find((item) => item === "I2") ||
                    tempBusSeat.find((item) => item.seat_no === "I2")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  I2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.I3)}
                  className={`${
                    seat.find((item) => item === "I3") ||
                    tempBusSeat.find((item) => item.seat_no === "I3")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  I3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.I4)}
                  className={`${
                    seat.find((item) => item === "I4") ||
                    tempBusSeat.find((item) => item.seat_no === "I4")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  I4
                </button>
              </div>
            </div>
            {seat_plan_to_data?.plan_name !== "40" ? 
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.J1)}
                  className={`${
                    seat.find((item) => item === "J1") ||
                    tempBusSeat.find((item) => item.seat_no === "J1")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  J1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.J2)}
                  className={`${
                    seat.find((item) => item === "J2") ||
                    tempBusSeat.find((item) => item.seat_no === "J2")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  J2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.J3)}
                  className={`${
                    seat.find((item) => item === "J3") ||
                    tempBusSeat.find((item) => item.seat_no === "J3")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  J3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.J4)}
                  className={`${
                    seat.find((item) => item === "J4") ||
                    tempBusSeat.find((item) => item.seat_no === "J4")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  J4
                </button>
              </div>
            </div> :
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.J1)}
                  className={`${
                    seat.find((item) => item === "J1") ||
                    tempBusSeat.find((item) => item.seat_no === "J1")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  J1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.J2)}
                  className={`${
                    seat.find((item) => item === "J2") ||
                    tempBusSeat.find((item) => item.seat_no === "J2")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  J2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.J3)}
                  className={`${
                    seat.find((item) => item === "J3") ||
                    tempBusSeat.find((item) => item.seat_no === "J3")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  J3
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.J4)}
                  className={`${
                    seat.find((item) => item === "J4") ||
                    tempBusSeat.find((item) => item.seat_no === "J4")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  J4
                </button>
                <button
                  onClick={() => setSeat(seatPlan.J5)}
                  className={`${
                    seat.find((item) => item === "J5") ||
                    tempBusSeat.find((item) => item.seat_no === "J5")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  J5
                </button>
              </div>
            </div>}
            {seat_plan_to_data?.plan_name !== "40" && <div className="flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.K1)}
                  className={`${
                    seat.find((item) => item === "K1") ||
                    tempBusSeat.find((item) => item.seat_no === "K1")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  K1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.K2)}
                  className={`${
                    seat.find((item) => item === "K2") ||
                    tempBusSeat.find((item) => item.seat_no === "K2")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  K2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.K3)}
                  className={`${
                    seat.find((item) => item === "K3") ||
                    tempBusSeat.find((item) => item.seat_no === "K3")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  K3
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.K4)}
                  className={`${
                    seat.find((item) => item === "K4") ||
                    tempBusSeat.find((item) => item.seat_no === "K4")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  K4
                </button>
                <button
                  onClick={() => setSeat(seatPlan.K5)}
                  className={`${
                    seat.find((item) => item === "K5") ||
                    tempBusSeat.find((item) => item.seat_no === "K5")
                      ? "bg-primary3 text-primary2"
                      : ""
                  } border border-primary2 px-1 w-8 hover:bg-primary3 hover:text-primary2 duration-300`}
                >
                  K5
                </button>
              </div>
            </div>}
          </div>
        </div>
        <div className="md:w-1/3 p-4">
          <SeatRate seat={tempBusSeat} price={seat_price} busClass = {seatPlan.busClass} getPassenger = {getPassenger} />
        </div>
      </div>
    </div>
  );
};

export default ShowBusCard;
