/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const BusProvider = createContext(null);


const BusContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userCall, setUserCall] = useState(false);
  const [bus, setBus] = useState(null);
  const [trip, setTrip] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [bookingInfo, setBookingInfo] = useState(null);
  const [saveBookingData, setSaveBookingData] = useState(null);
  const [searchTicket, setSearchTicket] = useState(null);
  const [unBookingInfo, setUnBookingInfo] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
      const getUserInfo = async () => {
        try {
          const res = await axiosPublic('/api/profile')
          setUser(res.data.userData);
        } catch (error) {
        }
      }
      getUserInfo();
  }, [axiosPublic, userCall])

  const setBusInfo = (bus) => {
    setBus(bus);
  };

  const setSaveBookingInfo = (bookInfo) => {
    setSaveBookingData(bookInfo);
  };

  const info = {
    bus,
    setBusInfo,
    trip,
    setTrip,
    modalImage,
    setModalImage,
    route,
    setRoute,
    loading,
    setLoading,
    user,
    setUser,
    errMsg,
    setErrMsg,
    bookingInfo,
    setBookingInfo,
    saveBookingData,
    setSaveBookingInfo,
    setUserCall,
    searchTicket,
    setSearchTicket,
    unBookingInfo,
    setUnBookingInfo
  };
  return <BusProvider.Provider value={info}>{children}</BusProvider.Provider>;
};

export default BusContext;
