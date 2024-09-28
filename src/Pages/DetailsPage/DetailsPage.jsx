import { useContext, useEffect, useState } from "react";
import { BusProvider } from "../../Provider/BusContext";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import bkash from "../../assets/payment/bkash-logo.png";
// import nagad from "../../assets/payment/nagad-logo.png";
// import rocket from "../../assets/payment/rocket-logo2.svg";
// import mfs from "../../assets/payment/mfd.svg";
import { Tab } from "@headlessui/react";
import toast from "react-hot-toast";
import BtnLoader from "../../Utils/Loader/BtnLoader";
import Loader from "../../Utils/Loader/Loader";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DetailsPage = () => {
  const [gender1, setGender1] = useState("");
  const [gender2, setGender2] = useState("");
  const [gender3, setGender3] = useState("");
  const [gender4, setGender4] = useState("");
  const [passengerData, setPassengerData] = useState(null);
  const [passengerDataUn, setPassengerDataUn] = useState(null);
  const { bookingInfo, trip } = useContext(BusProvider);
  const { setSaveBookingInfo, setUnBookingInfo, setGrantToken } = useContext(BusProvider);
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState("");
  const [limitedTrip, setLimitedTrip] = useState(true);
  const ticketId = bookingInfo?.ticketing_unique_id;
  const [totalSeat, setTotalSeat] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (bookingInfo) {
      axiosPublic
        .post("/api/get-passenger-details", bookingInfo)
        .then((res) => {
          if (res.data.status_code === 201) {
            setPassengerData(res.data);
            setLoading(false);
          }
        });
    } else {
      setLimitedTrip(false);

      try {
        axiosPublic
          .post("/api/get-filter-bus-list-for-un", trip)
          .then((res) => {
            if (res.data.status_code === 201) {
              setPassengerDataUn(res.data.busFTRouteList);
              setLoading(false);
            }
          });
      } catch (error) {
        setLoading(false);
      }
    }
  }, [bookingInfo]);

  const handleBkash = async (amount, invoice) => {
    const info = {
      amount: amount,
      invoice: invoice,
    };
    const res = await axiosPublic.post("/api/bkash/payment/create", info);
    console.log(res)
    if(res.data.grantToken){
      setLoading(false)
      setGrantToken(res.data.grantToken)
      localStorage.setItem("grantToken", res.data.grantToken)
      window.location.href = res.data.data.bkashURL
    }
  };


  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const email = e.target?.nameUnderBooking?.value;
    const seat = e.target?.totalSeat?.value;
    const center_name = e.target?.center?.value;
    const passenger_1 = e.target?.passenger_1?.value;
    const passenger_2 = e.target?.passenger_2?.value;
    const passenger_3 = e.target?.passenger_3?.value;
    const passenger_4 = e.target?.passenger_4?.value;

    if (limitedTrip) {
      try {
        const createPassengerObject = (numPassengers, dynamicPassenger) => {
          const obj = {};
          numPassengers?.map(
            (item, idx) =>
              (obj[item] = {
                name: dynamicPassenger[idx].name,
                gender: dynamicPassenger[idx].gender,
              })
          );
          return obj;
        };
        const dynamicPassenger = [
          { name: passenger_1, gender: gender1 ? gender1 : "" },
          { name: passenger_2, gender: gender2 ? gender2 : "" },
          { name: passenger_3, gender: gender3 ? gender3 : "" },
          { name: passenger_4, gender: gender4 ? gender4 : "" },
        ];
        const dynamicPassengerObject = createPassengerObject(
          passengerData?.getUserTicketIds,
          dynamicPassenger
        );

        const bookingInfo = {
          ticketing_unique_id: ticketId,
          trip_id: passengerData?.singleTripData.tripData.id,
          user_id: passengerData?.singleTripData.tripData.user_id,
          coupon_code: null,
          total_seat: passengerData?.totalSeat,
          total_seat_price: passengerData?.totalSeatPrice,
          paid_amount: passengerData?.totalSeatPrice,
          user_ticket_id: dynamicPassengerObject,
          contact_number: phone,
          contact_email: email || null,
          contact_name: name,
        };

        const res = await axiosPublic.post(
          "/api/save-passenger-details",
          bookingInfo
        );
        if (res.data.status_code === 201) {
          handleBkash(passengerData.totalSeatPrice, res.data.invoiceData.invoice)
          setSaveBookingInfo(res.data);
          localStorage.setItem('contact_number', phone)
          localStorage.setItem('pnr', res.data.invoiceData.invoice)
          e.target.reset();
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.errors[0]);
      }
    } else {
      const unBooking = {
        trip_id: passengerDataUn[0]?.getFilterBusList.id,
        contact_name: name,
        contact_number: phone,
        contact_email: email,
        payment_type: "Hand Cash",
        total_seat: seat,
        total_seat_price:
          seat * passengerDataUn[0]?.getFilterBusList.seat_price,
        center_name,
      };

      const res = await axiosPublic.post(
        "/api/save-seat-booking-appoinment",
        unBooking
      );
      if (res.data.status_code === 201) {
        setUnBookingInfo(res.data.busFTRouteList);
        handleBkash(unBooking.total_seat_price, res.data.busFTRouteList.pnr_no)
        localStorage.setItem("isUn", true)
        localStorage.setItem("center_name", unBooking.center_name)
        localStorage.setItem('contact_number', unBooking.contact_number)
        localStorage.setItem('pnr', res.data.busFTRouteList.pnr_no)
        e.target.reset();
      }
    }
  };

  if (!passengerData && !passengerDataUn) {
    return <Loader />;
  }
  if (!passengerData && !passengerDataUn) {
    return (
      <p className="my-10 text-center text-cardBG font-semibold text-xl">
        You have no data
      </p>
    );
  }

  return (
    <form
      onSubmit={handleBooking}
      className="max-w-7xl mx-auto"
      id="scrollable-container"
    >
      <div className="flex flex-col-reverse md:flex-row gap-4 mt-6">
        <div className="md:w-2/3 bg-primary2 p-2 border-t-[5px] border-t-primary3 rounded-md">
          <div className="px-2 py-4">
            <h1 className="font-semibold text-xl">Contact Information</h1>
            <hr className="my-2" />
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Name{" "}
                    <span className="text-xs text-cardBG">(require)</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm focus:outline-none block w-full p-2.5"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Phone{" "}
                    <span className="text-xs text-cardBG">(require)</span>
                  </label>
                  <input
                    type="number"
                    name="phone"
                    className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm focus:outline-none block w-full p-2.5"
                    placeholder="01700000000"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="nameUnderBooking"
                    className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none"
                    placeholder="email@gmail.com"
                  />
                </div>
                {!limitedTrip && (
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Total Seat
                    </label>
                    <input
                      type="number"
                      name="totalSeat"
                      onChange={(e) => setTotalSeat(e.target.value)}
                      className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none"
                      placeholder="Seat Number"
                      required
                    />
                  </div>
                )}
              </div>
              {!limitedTrip && (
                <div className="w-full mt-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Select Center
                  </label>
                  <select
                    name="center"
                    className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-lg rounded-sm block w-full p-2 focus:outline-none"
                  >
                    <option value="RMSTU, Jhagrabil, Rangamati">
                      RMSTU, Jhagrabil, Rangamati
                    </option>
                    <option value="RMSTU, Monoghar (Rangapani), Rangamati">
                      RMSTU, Monoghar (Rangapani), Rangamati
                    </option>
                    <option value="RMSTU, Sangharam (Vedvedi), Rangamati">
                      RMSTU, Sangharam (Vedvedi), Rangamati
                    </option>
                    <option value="Rangamati govt college, College gate, Rangamati">
                      Rangamati govt college, College gate, Rangamati
                    </option>
                    <option value="Lakers' Public School & College, Kathaltali, Rangamati">
                      Lakers&apos; Public School & College, Kathaltali, Rangamati
                    </option>
                    <option value="Rangamati Govt. Mohila College, Reserve Bazar, Rangamati">
                      Rangamati Govt. Mohila College, Reserve Bazar, Rangamati
                    </option>
                    <option value="Shahid Abdul Ali Academy, Reserve Bazar, Rangamati">
                      Shahid Abdul Ali Academy, Reserve Bazar, Rangamati
                    </option>
                    <option value="Rangamati Govt. Girls High School, Tabalchari, Rangamati">
                      Rangamati Govt. Girls High School, Tabalchari, Rangamati
                    </option>
                    <option value="Others (type your center)">
                      Others (type your center)
                    </option>
                  </select>
                </div>
              )}
              {/* Passenger Information */}
              {limitedTrip && (
                <h1 className="font-semibold text-xl mt-4">
                  Passenger Information
                </h1>
              )}
              {limitedTrip && <hr className="my-2" />}
              <div className="">
                {passengerData?.getUserTicketIds?.length === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Passenger-1 Name
                      </label>
                      <input
                        type="text"
                        name={`passenger_1`}
                        className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none"
                        placeholder="Example"
                        required
                      />
                      <div className="flex gap-5 mt-2">
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Male</p>
                          <input
                            onChange={(e) => setGender1(e.target.value)}
                            checked={gender1 === "Male"}
                            type="checkbox"
                            name="gender"
                            value="Male"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Female</p>
                          <input
                            onChange={(e) => setGender1(e.target.value)}
                            checked={gender1 === "Female"}
                            type="checkbox"
                            name="gender"
                            value="Female"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Others</p>
                          <input
                            onChange={(e) => setGender1(e.target.value)}
                            checked={gender1 === "Others"}
                            type="checkbox"
                            name="gender"
                            value="Others"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {passengerData?.getUserTicketIds?.length === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Passenger-1 Name
                      </label>
                      <input
                        type="text"
                        name={`passenger_1`}
                        className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none"
                        placeholder="Example"
                        required
                      />
                      <div className="flex gap-5 mt-2">
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Male</p>
                          <input
                            onChange={(e) => setGender1(e.target.value)}
                            checked={gender1 === "Male"}
                            type="checkbox"
                            name="gender"
                            value="Male"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Female</p>
                          <input
                            onChange={(e) => setGender1(e.target.value)}
                            checked={gender1 === "Female"}
                            type="checkbox"
                            name="gender"
                            value="Female"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Others</p>
                          <input
                            onChange={(e) => setGender1(e.target.value)}
                            checked={gender1 === "Others"}
                            type="checkbox"
                            name="gender"
                            value="Others"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Passenger-2 Name
                      </label>
                      <input
                        type="text"
                        name={`passenger_2`}
                        className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none"
                        placeholder="Example"
                        required
                      />
                      <div className="flex gap-5 mt-2">
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Male</p>
                          <input
                            onChange={(e) => setGender2(e.target.value)}
                            checked={gender2 === "Male"}
                            type="checkbox"
                            name="gender"
                            value="Male"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Female</p>
                          <input
                            onChange={(e) => setGender2(e.target.value)}
                            checked={gender2 === "Female"}
                            type="checkbox"
                            name="gender"
                            value="Female"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Others</p>
                          <input
                            onChange={(e) => setGender2(e.target.value)}
                            checked={gender2 === "Others"}
                            type="checkbox"
                            name="gender"
                            value="Others"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {passengerData?.getUserTicketIds?.length === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Passenger-1 Name
                      </label>
                      <input
                        type="text"
                        name={`passenger_1`}
                        className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none"
                        placeholder="Example"
                        required
                      />
                      <div className="flex gap-5 mt-2">
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Male</p>
                          <input
                            onChange={(e) => setGender1(e.target.value)}
                            checked={gender1 === "Male"}
                            type="checkbox"
                            name="gender"
                            value="Male"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Female</p>
                          <input
                            onChange={(e) => setGender1(e.target.value)}
                            checked={gender1 === "Female"}
                            type="checkbox"
                            name="gender"
                            value="Female"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Others</p>
                          <input
                            onChange={(e) => setGender1(e.target.value)}
                            checked={gender1 === "Others"}
                            type="checkbox"
                            name="gender"
                            value="Others"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Passenger-2 Name
                      </label>
                      <input
                        type="text"
                        name={`passenger_2`}
                        className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none"
                        placeholder="Example"
                        required
                      />
                      <div className="flex gap-5 mt-2">
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Male</p>
                          <input
                            onChange={(e) => setGender2(e.target.value)}
                            checked={gender2 === "Male"}
                            type="checkbox"
                            name="gender"
                            value="Male"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Female</p>
                          <input
                            onChange={(e) => setGender2(e.target.value)}
                            checked={gender2 === "Female"}
                            type="checkbox"
                            name="gender"
                            value="Female"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Others</p>
                          <input
                            onChange={(e) => setGender2(e.target.value)}
                            checked={gender2 === "Others"}
                            type="checkbox"
                            name="gender"
                            value="Others"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Passenger-3 Name
                      </label>
                      <input
                        type="text"
                        name={`passenger_3`}
                        className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none"
                        placeholder="Example"
                        required
                      />
                      <div className="flex gap-5 mt-2">
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Male</p>
                          <input
                            onChange={(e) => setGender3(e.target.value)}
                            checked={gender3 === "Male"}
                            type="checkbox"
                            name="gender"
                            value="Male"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Female</p>
                          <input
                            onChange={(e) => setGender3(e.target.value)}
                            checked={gender3 === "Female"}
                            type="checkbox"
                            name="gender"
                            value="Female"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Others</p>
                          <input
                            onChange={(e) => setGender3(e.target.value)}
                            checked={gender3 === "Others"}
                            type="checkbox"
                            name="gender"
                            value="Others"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {passengerData?.getUserTicketIds?.length === 4 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Passenger-1 Name
                      </label>
                      <input
                        type="text"
                        name={`passenger_1`}
                        className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none"
                        placeholder="Example"
                        required
                      />
                      <div className="flex gap-5 mt-2">
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Male</p>
                          <input
                            onChange={(e) => setGender1(e.target.value)}
                            checked={gender1 === "Male"}
                            type="checkbox"
                            name="gender"
                            value="Male"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Female</p>
                          <input
                            onChange={(e) => setGender1(e.target.value)}
                            checked={gender1 === "Female"}
                            type="checkbox"
                            name="gender"
                            value="Female"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Others</p>
                          <input
                            onChange={(e) => setGender1(e.target.value)}
                            checked={gender1 === "Others"}
                            type="checkbox"
                            name="gender"
                            value="Others"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Passenger-2 Name
                      </label>
                      <input
                        type="text"
                        name={`passenger_2`}
                        className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none"
                        placeholder="Example"
                        required
                      />
                      <div className="flex gap-5 mt-2">
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Male</p>
                          <input
                            onChange={(e) => setGender2(e.target.value)}
                            checked={gender2 === "Male"}
                            type="checkbox"
                            name="gender"
                            value="Male"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Female</p>
                          <input
                            onChange={(e) => setGender2(e.target.value)}
                            checked={gender2 === "Female"}
                            type="checkbox"
                            name="gender"
                            value="Female"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Others</p>
                          <input
                            onChange={(e) => setGender2(e.target.value)}
                            checked={gender2 === "Others"}
                            type="checkbox"
                            name="gender"
                            value="Others"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Passenger-3 Name
                      </label>
                      <input
                        type="text"
                        name={`passenger_3`}
                        className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none"
                        placeholder="Example"
                        required
                      />
                      <div className="flex gap-5 mt-2">
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Male</p>
                          <input
                            onChange={(e) => setGender3(e.target.value)}
                            checked={gender3 === "Male"}
                            type="checkbox"
                            name="gender"
                            value="Male"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Female</p>
                          <input
                            onChange={(e) => setGender3(e.target.value)}
                            checked={gender3 === "Female"}
                            type="checkbox"
                            name="gender"
                            value="Female"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Others</p>
                          <input
                            onChange={(e) => setGender3(e.target.value)}
                            checked={gender3 === "Others"}
                            type="checkbox"
                            name="gender"
                            value="Others"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Passenger-3 Name
                      </label>
                      <input
                        type="text"
                        name={`passenger_4`}
                        className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none"
                        placeholder="Example"
                        required
                      />
                      <div className="flex gap-5 mt-2">
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Male</p>
                          <input
                            onChange={(e) => setGender4(e.target.value)}
                            checked={gender4 === "Male"}
                            type="checkbox"
                            name="gender"
                            value="Male"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Female</p>
                          <input
                            onChange={(e) => setGender4(e.target.value)}
                            checked={gender4 === "Female"}
                            type="checkbox"
                            name="gender"
                            value="Female"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold">Others</p>
                          <input
                            onChange={(e) => setGender4(e.target.value)}
                            checked={gender4 === "Others"}
                            type="checkbox"
                            name="gender"
                            value="Others"
                            className="checkbox checkbox-error w-5 h-5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {!limitedTrip && (
                <div className="flex justify-between">
                  <button className="bg-primary3 px-3 py-1 border-none text-primary2 font-semibold hover:bg-cardBG duration-300 mt-2 flex">
                    {loading ? <BtnLoader /> :"Confirm Booking"}
                  </button>
                  <div className="bg-primary3 px-3 py-1 border-none text-primary2 font-semibold hover:bg-cardBG duration-300 mt-2 flex">
                    Total Price: {" "} 
                    {passengerDataUn[0]?.getFilterBusList.seat_price *
                      totalSeat}
                    /-
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="md:w-1/3">
          {limitedTrip ? (
            <div className="bg-primary2 p-2 border-l-[5px] border-l-primary3 rounded-md">
              <h1 className="font-semibold text-xl">Journey Details</h1>
              <hr className="my-2" />
              <ul className="space-y-1">
                <li className="text-xl font-semibold text-primary3">
                  {passengerData?.singleTripData?.tripData.trip_name}
                </li>
                <li>
                  <span className="font-semibold">Journey Date:</span>{" "}
                  {passengerData?.singleTripData?.tripData.deperture_date}
                </li>
                <li>
                  <span className="font-semibold">Exam Date:</span>{" "}
                  {passengerData?.singleTripData?.tripData.exam_date}
                </li>
                <li>
                  <span className="font-semibold">Return Date:</span>{" "}
                  {passengerData?.singleTripData?.tripData.return_date}
                </li>
                <li>
                  <span className="font-semibold">Seat No:</span>{" "}
                  <span className="text-primary3">
                    {passengerData?.singleTripData?.getUserSeatNo.map(
                      (item) => item
                    )}
                  </span>
                </li>
                <li>
                  <span className="font-semibold">Boarding Point:</span>
                  {passengerData?.singleTripData?.getBoardingPoint.map(
                    (item) => item.point_name
                  )}
                </li>
              </ul>
            </div>
          ) : (
            <div className="bg-primary2 p-2 border-l-[5px] border-l-primary3 rounded-md">
              <h1 className="font-semibold text-xl">Journey Details</h1>
              <hr className="my-2" />
              <ul className="space-y-1">
                <li className="text-xl font-semibold text-primary3">
                  {passengerDataUn[0]?.getFilterBusList.trip_name}
                </li>
                <li>
                  <span className="font-semibold">Journey Date:</span>{" "}
                  {passengerDataUn[0]?.getFilterBusList.deperture_date}
                </li>
                <li>
                  <span className="font-semibold">Journey Time:</span>{" "}
                  {passengerDataUn[0]?.getFilterBusList.deperture_time}
                </li>
                <li>
                  <span className="font-semibold">Return Date:</span>
                  {passengerDataUn[0]?.getFilterBusList.return_date}
                </li>
                <li>
                  <span className="font-semibold">Return Time:</span>
                  {passengerDataUn[0]?.getFilterBusList.return_time}
                </li>
                <li className="font-bold">
                  <span className="font-semibold">Seat Price:</span>{" "}
                  {passengerDataUn[0]?.getFilterBusList.seat_price}/-
                </li>
              </ul>
            </div>
          )}

          {limitedTrip && (
            <div className="bg-primary2 p-2 border-l-[5px] border-l-primary3 rounded-md mt-4">
              <h1 className="font-semibold text-xl">Fare Details</h1>
              <hr className="my-2" />
              <ul className="space-y-1 mt-2">
                <li className="flex justify-between border-b-[1px] py-2">
                  <span>Ticket Price</span>{" "}
                  <span className="font-semibold">
                    {passengerData?.totalSeatPrice}/-
                  </span>
                </li>
                <li className="flex justify-between border-b-[1px] py-2">
                  <input
                    type="number"
                    name="coupon"
                    className="shadow-sm bg-primary4 border border-primary5 text-gray-900 text-sm rounded-sm focus:outline-none block w-2/3 p-2.5"
                    placeholder="Enter Coupon Code"
                  />
                  <button className="bg-primary3 px-8 py-1 border-none text-primary2 font-semibold hover:bg-cardBG duration-300">
                    Apply
                  </button>
                </li>
                <li className="flex justify-between border-b-[1px] py-2">
                  <span>Processing Fee</span> <span>0/-</span>
                </li>
                <li className="flex justify-between border-b-[1px] py-2">
                  <span>Discount</span> <span>0/-</span>
                </li>
                <li className="flex justify-between border-b-[1px] py-2 font-semibold">
                  <span>Total</span>{" "}
                  <span className="font-semibold">
                    {passengerData?.totalSeatPrice}/-
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {limitedTrip && (
        <div className="mt-5 flex gap-4">
          <div className="md:flex-1">
            <div className="bg-primary2 p-2 border-t-[5px] border-t-primary3 rounded-md">
              <h1 className="font-semibold text-xl">Payment Details</h1>
              <hr className="my-2" />
              <div className="border-[1px] border-primary5 p-5">
                <h1 className="text-lg md:text-2xl text-center font-semibold">
                  Total Payable Amount:
                  <span className="text-primary3">
                    {passengerData?.totalSeatPrice}/-
                  </span>
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
                  type="checkbox"
                  name="Agree"
                  className="checkbox checkbox-error w-5 h-5"
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
                    <div className="mt-3 flex justify-center items-center gap-2">
                      <div
                        onClick={handleBkash}
                        className="w-2/4 h-14 overflow-hidden bg-primary4 py-1 shadow-md cursor-pointer"
                      >
                        <img
                          src={bkash}
                          className="h-full w-full object-contain"
                          alt=""
                        />
                      </div>
                      {/* <div className="w-1/4 h-14 overflow-hidden bg-primary4 px-3 py-1 shadow-md">
                        <img
                          src={rocket}
                          className="h-full w-full object-contain"
                          alt=""
                        />
                      </div>
                      <div className="w-1/4 h-14 overflow-hidden bg-primary4 py-1 shadow-md">
                        <img
                          src={nagad}
                          className="h-full w-full object-contain"
                          alt=""
                        />
                      </div>
                      <div className="w-1/4 h-14 bg-primary4 py-1 shadow-md flex gap-2 items-center justify-center">
                        <img src={mfs} className="w-8" alt="" />
                        <p className="text-sm font-semibold">Others MFS</p>
                      </div> */}
                    </div>
                    <div className="flex justify-center mt-10">
                      <button className="bg-primary3 px-3 py-1 border-none text-primary2 font-semibold hover:bg-cardBG duration-300 mt-2 flex">
                        {loading ? <BtnLoader /> : "Confirm Booking"}
                      </button>
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
                      <p className="text-primary3 font-semibold text-lg ">
                        This features is not available right now.
                      </p>
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
                      <p className="text-primary3 font-semibold text-lg ">
                        This features is not available right now.
                      </p>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      )}
    </form>
  );
};

export default DetailsPage;
