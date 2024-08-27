import { useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import BusRoute from "../../components/BusRoute/BusRoute";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="space-y-14">
      <Banner />
      <div className="px-2 lg:px-0">
      <BusRoute />
      </div>
    </div>
  );
};

export default Home;
