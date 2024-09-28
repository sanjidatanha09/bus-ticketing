import UnitModal from "../../Utils/Modal/UnitModal";
import useGetRoute from "../../Hooks/useGetRoute";
import Loader from "../../Utils/Loader/Loader";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { BusProvider } from "../../Provider/BusContext";
import rangamatiImage from "../../assets/banner/rangamati_image.jpg";
import UnUnitModal from "../../Utils/Modal/UnUniteModal";

const BusRoute = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUn, setIsOpenUn] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { route, routeLoading } = useGetRoute();
  const { setRoute, setLoading } = useContext(BusProvider);
  const [unRouteData, setUnRouteData] = useState(null);
  const imgUrl =
    "https://admissionbus.com/backendpanel/backend/uploads/destinationImage/";

  const fetchUnlimitedData = async () => {
    try {
      const res = await axiosPublic("/api/get-bus-route-list-for-un");
      if ((res.data.status_code = 201)) {
        setUnRouteData(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchUnlimitedData();
  }, []);

  const handleUnit = async (id) => {
    setIsOpen(true);
    setLoading(true);
    try {
      const res = await axiosPublic(`/api/get-unit-list-with-route/${id}`);
      if (res.data.status_code === 201) {
        setRoute({ unit: res.data.unitList, destination_id: id });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUnUnite = async (id) => {
    setIsOpenUn(true);
    setLoading(true);
    try {
      const res = await axiosPublic(
        `/api/get-unit-list-with-route-for-un/${id}`
      );
      if (res.data.status_code === 201) {
        setRoute({ unit: res.data.unitList, destination_id: id });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  if (routeLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="">
        <p className="text-secondary1 text-center text-lg md:text-2xl font-bold mb-10 border-b-2 max-w-fit mx-auto pb-3">
          নিচের তালিকা থেকে আপনার টিকেট বুক করুন ( লিমিটেড )
        </p>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-10 justify-center">
        {route?.busRouteList?.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="relative h-[200px] w-full group">
              <img
                src={`${imgUrl}${item?.destination_image}`}
                alt=""
                className="w-full h-full object-cover"
              />
              <div
                className="flex flex-col rounded-t-md bg-cardBG text-xl text-primary2 font-semibold 
              justify-center items-center group-hover:scale-105 duration-300 absolute bottom-0 w-full"
              >
                <p className="text-xl text-center">{item?.destination_name}</p>
                <p className="mb-1">{item?.route_type}</p>
                <div>
                  <div className="h-[2px] w-0 group-hover:w-1/2 duration-300 bg-primary2 absolute bottom-[3px] left-0"></div>
                  <div className="h-[2px] w-0 group-hover:w-1/2 duration-300 bg-primary2 absolute bottom-[3px] right-0"></div>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleUnit(item?.id)}
              className="btn bg-primary3 text-lg rounded-md text-primary2 px-6 hover:bg-cardBG mt-2"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* ===================================================== UnLimited =========================================================== */}
      <div className="mt-10">
        <p className="text-secondary1 text-center text-lg md:text-2xl font-bold mb-10 border-b-2 max-w-fit mx-auto pb-3">
          নিচের তালিকা থেকে আপনার টিকেট বুক করুন ( আনলিমিটেড )
        </p>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-10 justify-center">
        {unRouteData?.busRouteList?.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="relative h-[200px] w-full group">
              <img
                src={`${imgUrl}${item?.destination_image}`}
                alt=""
                className="w-full h-full object-cover"
              />
              <div
                className="flex flex-col rounded-t-md bg-cardBG text-xl text-primary2 font-semibold 
              justify-center items-center group-hover:scale-105 duration-300 absolute bottom-0 w-full"
              >
                <p className="text-xl text-center">{item?.destination_name}</p>
                <p className="mb-1">{item?.route_type}</p>
                <div>
                  <div className="h-[2px] w-0 group-hover:w-1/2 duration-300 bg-primary2 absolute bottom-[3px] left-0"></div>
                  <div className="h-[2px] w-0 group-hover:w-1/2 duration-300 bg-primary2 absolute bottom-[3px] right-0"></div>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleUnUnite(item?.id)}
              className="btn bg-primary3 text-lg rounded-md text-primary2 px-6 hover:bg-cardBG mt-2"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
      <UnitModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <UnUnitModal isOpen={isOpenUn} setIsOpen={setIsOpenUn} />
    </div>
  );
};

export default BusRoute;
