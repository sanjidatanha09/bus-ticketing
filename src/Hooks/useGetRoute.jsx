import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useGetRoute = () => {
  const axiosPublic = useAxiosPublic();
  const [route, setRoute] = useState([]);
  const [routeLoading, setRouteLoading] = useState(false);

  const fetchRoute = async () => {
   try {
    setRouteLoading(true);
    const res = await axiosPublic("/api/get-bus-route-list" );
    if (res.data.status_code === 201) {
      setRoute(res.data);
      setRouteLoading(false);
    }
   } catch (error) {
    setRouteLoading(false)
   }
  };

  useEffect(() => {
    fetchRoute();
  }, []);

  return { route, fetchRoute, routeLoading };
};

export default useGetRoute;
