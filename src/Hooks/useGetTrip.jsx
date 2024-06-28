import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useGetTrip = (trip) => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [trips, setTrips] = useState([]);
  const [errMessage, setErrMessage] = useState("");

  const fetchTrip = async () => {
    try {
      setLoading(true);
      const idInfo = {
        destination_id: trip?.destination_id,
        unit_id: trip?.unit_id,
      };

      const res = await axiosPublic.post(
        "/api/get-filter-bus-list",
        idInfo
      );
  
      if (res.data.busFTRouteList.length > 0) {
        setTrips(res.data.busFTRouteList);
        setLoading();
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  return { trips, loading, errMessage };
};

export default useGetTrip;
