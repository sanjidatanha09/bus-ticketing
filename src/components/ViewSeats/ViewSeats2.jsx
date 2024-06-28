import { useState } from "react";
import { PiArrowFatLinesLeftLight, PiEngineFill } from "react-icons/pi";
import { TbSteeringWheel } from "react-icons/tb";


const seatPlan = {
    A1: {
      seat_number: "A1",
      seat_class: "Business",
    },
    A2: {
      seat_number: "A2",
      seat_class: "Economy",
    },
    A3: {
      seat_number: "A3",
      seat_class: "Business",
    },
    A4: {
      seat_number: "A4",
      seat_class: "Normal",
    },
    B1: {
      seat_number: "B1",
      seat_class: "Business",
    },
    B2: {
      seat_number: "B2",
      seat_class: "Economy",
    },
    B3: {
      seat_number: "B3",
      seat_class: "Business",
    },
    B4: {
      seat_number: "B4",
      seat_class: "Normal",
    },
    C1: {
      seat_number: "C1",
      seat_class: "Business",
    },
    C2: {
      seat_number: "C2",
      seat_class: "Economy",
    },
    C3: {
      seat_number: "C3",
      seat_class: "Business",
    },
    C4: {
      seat_number: "C4",
      seat_class: "Normal",
    },
    D1: {
      seat_number: "D1",
      seat_class: "Business",
    },
    D2: {
      seat_number: "D2",
      seat_class: "Economy",
    },
    D3: {
      seat_number: "D3",
      seat_class: "Business",
    },
    D4: {
      seat_number: "D4",
      seat_class: "Normal",
    },
    E1: {
      seat_number: "E1",
      seat_class: "Business",
    },
    E2: {
      seat_number: "E2",
      seat_class: "Economy",
    },
    E3: {
      seat_number: "E3",
      seat_class: "Business",
    },
    E4: {
      seat_number: "E4",
      seat_class: "Normal",
    },
    F1: {
      seat_number: "F1",
      seat_class: "Business",
    },
    F2: {
      seat_number: "F2",
      seat_class: "Economy",
    },
    F3: {
      seat_number: "F3",
      seat_class: "Business",
    },
    F4: {
      seat_number: "F4",
      seat_class: "Normal",
    },
    G1: {
      seat_number: "G1",
      seat_class: "Business",
    },
    G2: {
      seat_number: "G2",
      seat_class: "Economy",
    },
    G3: {
      seat_number: "G3",
      seat_class: "Business",
    },
    G4: {
      seat_number: "G4",
      seat_class: "Normal",
    },
    H1: {
      seat_number: "H1",
      seat_class: "Business",
    },
    H2: {
      seat_number: "H2",
      seat_class: "Economy",
    },
    H3: {
      seat_number: "H3",
      seat_class: "Business",
    },
    H4: {
      seat_number: "H4",
      seat_class: "Normal",
    },
    I1: {
      seat_number: "I1",
      seat_class: "Business",
    },
    I2: {
      seat_number: "I2",
      seat_class: "Economy",
    },
    I3: {
      seat_number: "I3",
      seat_class: "Business",
    },
    I4: {
      seat_number: "I4",
      seat_class: "Normal",
    },
    J1: {
      seat_number: "J1",
      seat_class: "Business",
    },
    J2: {
      seat_number: "J2",
      seat_class: "Economy",
    },
    J3: {
      seat_number: "J3",
      seat_class: "Business",
    },
    J4: {
      seat_number: "J4",
      seat_class: "Normal",
    },
    J5: {
      seat_number: "J5",
      seat_class: "Normal",
    },
  };
  
const ViewSeats2 = () => {
    const [seat, setBusSeat] = useState([]);

    const setSeat = (booking) => {
        const filter = seat.find(
          (item) => item.seat_number === booking.seat_number
        );
    
        if (filter) {
          const filter = seat.filter(
            (seat) => seat.seat_number !== booking.seat_number
          );
          setBusSeat(filter);
        } else {
          setBusSeat([...seat, booking]);
        }
      };
    return (
        <div>
            <div className="w-60 bg-white p-4 space-y-2">
            <div className="flex justify-between">
              <div>
                <PiArrowFatLinesLeftLight className="text-3xl text-gray-500" />
              </div>
              <div className="flex flex-col items-center">
                <PiEngineFill className="text-2xl text-gray-500" />
                <p className="text-[8px] -mt-1">Engin</p>
              </div>
              <div className="flex flex-col items-center">
                <TbSteeringWheel className="text-3xl text-gray-500" />
                <p className="text-[8px] -mt-1">Driver</p>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.A1)}
                  className={`${
                    seat.find((item) => item.seat_number === "A1")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  A1
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.A3)}
                  className={`${
                    seat.find((item) => item.seat_number === "A3")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  A3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.A4)}
                  className={`${
                    seat.find((item) => item.seat_number === "A4")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
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
                    seat.find((item) => item.seat_number === "B1")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  B1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.B2)}
                  className={`${
                    seat.find((item) => item.seat_number === "B2")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  B2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.B3)}
                  className={`${
                    seat.find((item) => item.seat_number === "B3")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  B3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.B4)}
                  className={`${
                    seat.find((item) => item.seat_number === "B4")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
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
                    seat.find((item) => item.seat_number === "C1")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  C1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.C2)}
                  className={`${
                    seat.find((item) => item.seat_number === "C2")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  C2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.C3)}
                  className={`${
                    seat.find((item) => item.seat_number === "C3")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  C3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.C4)}
                  className={`${
                    seat.find((item) => item.seat_number === "C4")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
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
                    seat.find((item) => item.seat_number === "D1")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  D1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.D2)}
                  className={`${
                    seat.find((item) => item.seat_number === "D2")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  D2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.D3)}
                  className={`${
                    seat.find((item) => item.seat_number === "D3")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  D3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.D4)}
                  className={`${
                    seat.find((item) => item.seat_number === "D4")
                      ? "bg-grDy-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
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
                    seat.find((item) => item.seat_number === "E1")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  E1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.E2)}
                  className={`${
                    seat.find((item) => item.seat_number === "E2")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  E2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.E3)}
                  className={`${
                    seat.find((item) => item.seat_number === "E3")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  E3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.E4)}
                  className={`${
                    seat.find((item) => item.seat_number === "E4")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
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
                    seat.find((item) => item.seat_number === "F1")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  F1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.F2)}
                  className={`${
                    seat.find((item) => item.seat_number === "F2")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  F2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.F3)}
                  className={`${
                    seat.find((item) => item.seat_number === "F3")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  F3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.F4)}
                  className={`${
                    seat.find((item) => item.seat_number === "F4")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
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
                    seat.find((item) => item.seat_number === "G1")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  G1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.G2)}
                  className={`${
                    seat.find((item) => item.seat_number === "G2")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  G2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.G3)}
                  className={`${
                    seat.find((item) => item.seat_number === "G3")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  G3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.G4)}
                  className={`${
                    seat.find((item) => item.seat_number === "G4")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
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
                    seat.find((item) => item.seat_number === "H1")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  H1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.H2)}
                  className={`${
                    seat.find((item) => item.seat_number === "H2")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  H2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.H3)}
                  className={`${
                    seat.find((item) => item.seat_number === "H3")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  H3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.H4)}
                  className={`${
                    seat.find((item) => item.seat_number === "H4")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
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
                    seat.find((item) => item.seat_number === "I1")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  I1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.I2)}
                  className={`${
                    seat.find((item) => item.seat_number === "I2")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  I2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.I3)}
                  className={`${
                    seat.find((item) => item.seat_number === "I3")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  I3
                </button>
                <button
                  onClick={() => setSeat(seatPlan.I4)}
                  className={`${
                    seat.find((item) => item.seat_number === "I4")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  I4
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.J1)}
                  className={`${
                    seat.find((item) => item.seat_number === "J1")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  J1
                </button>
                <button
                  onClick={() => setSeat(seatPlan.J2)}
                  className={`${
                    seat.find((item) => item.seat_number === "J2")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  J2
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.J3)}
                  className={`${
                    seat.find((item) => item.seat_number === "J3")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  J3
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeat(seatPlan.J4)}
                  className={`${
                    seat.find((item) => item.seat_number === "J4")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  J4
                </button>
                <button
                  onClick={() => setSeat(seatPlan.J5)}
                  className={`${
                    seat.find((item) => item.seat_number === "J5")
                      ? "bg-gray-400 text-white"
                      : ""
                  } border border-gray-400 px-1 w-8 hover:bg-gray-400 hover:text-white duration-300`}
                >
                  J5
                </button>
              </div>
            </div>
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setBusSeat([])}
                className="hover:bg-green-700 duration-300 bg-green-600 px-3 py-1 border-none text-white font-semibold"
              >
                Reset Seat
              </button>
            </div>
          </div>
        </div>
    );
};

export default ViewSeats2;