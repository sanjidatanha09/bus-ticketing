import { useContext, useEffect, useState } from "react";
import img1 from "../../assets/buss/slide_1.png";
import img2 from "../../assets/buss/slide_2.png";
import img3 from "../../assets/buss/slide_3.png";
import Select from "react-select";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { BusProvider } from "../../Provider/BusContext";
import { useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";



const Bus = () => {
  const value = [];

  const [currentSlider, setCurrentSlider] = useState(0);
  const axiosPublic = useAxiosPublic();
  const [rout, setRout] = useState([]);
  const { setBusInfo } = useContext(BusProvider);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  rout?.forEach((item) => {
    let object = {};
    object["value"] = item.destination_name;
    object["label"] = item.destination_name;
    value.push(object);
  });

  const fetchRout = async () => {
    const res = await axiosPublic("/api/get-bus-route-list");
    setRout(res.data.busRouteList);
  };

  useEffect(() => {
    fetchRout();
  }, []);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const toSelect = e.target.to.value;
    const fromSelect = e.target.from.value;
    const date = e.target.date.value;

    const data = { toSelect, fromSelect, date };
    if (toSelect && fromSelect && date) {
      setBusInfo(data);
      navigate("/busView");
    } else{
      return setError('Select Date')
    }
  };

  const sliders = [
    {
      img: img3,
    },
    {
      img: img1,
    },
    {
      img: img2,
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setCurrentSlider(
          currentSlider === sliders.length - 1 ? 0 : currentSlider + 1
        ),
      5000
    );
    return () => clearInterval(intervalId);
  }, [currentSlider, sliders.length]);

  return (
    <div className="lg:px-32  md:px-20 py-20">
      <div className="grid md:grid-cols-2 grid-cols-1 items-center justify-center gap-4">
        <div>
          <form onSubmit={handleSubmitSearch} className="w-full">
            <div className="flex gap-4">
              <div className="mb-4 w-full">
                <label
                  htmlFor="input"
                  className="block text-sm font-medium text-gray-700"
                >
                  From <span className="text-red-500 text-xl">*</span>
                </label>
                <Select
                  className="basic-single"
                  classNamePrefix="Where from go"
                  isSearchable={true}
                  isClearable={true}
                  name="from"
                  required
                  options={value}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="input"
                  className="block text-sm font-medium text-gray-700"
                >
                  To <span className="text-red-500 text-xl">*</span>
                </label>
                <div className="mb-4">
                  <Select
                    className="basic-single bg-white"
                    classNamePrefix="Where to go"
                    isSearchable={true}
                    isClearable={true}
                    name="to"
                    required
                    options={value}
                  />
                </div>
              </div>
            </div>
            <div className="md:flex gap-2">
              <div className="w-full">
                <label
                  htmlFor="departureDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Departure Date <span className="text-red-500 text-xl">*</span>
                </label>
                <Flatpickr
                className="w-full bg-white border rounded-md py-1 px-2"
                  data-enable-time
                  options={{dateFormat: 'd-m-Y'}}
                  placeholder="Select Date"
                  name="date"
                />
                <p className="text-sm text-red-500">{error}</p>
              </div>
            </div>
            <button
              className="w-full rounded mt-10 text-white bg-green-600 hover:bg-green-700 py-2 text-center font-semibold duration-300"
              type="submit"
            >
              Search Bus
            </button>
          </form>
        </div>
        <div>
          <div
            className="w-full h-60 sm:h-96 md:h-[540px] flex flex-col items-center justify-center gap-5 lg:gap-10 bg-cover bg-center before:absolute  before:inset-0 transform duration-1000 ease-linear"
            style={{
              backgroundImage: `url(${sliders[currentSlider].img})`,
              borderRadius: "10px",
            }}
          >
            <div className="drop-shadow-lg text-white text-center px-5">
              <h1 className="text-xl lg:text-3xl font-semibold mb-3">
                {sliders[currentSlider].title}
              </h1>
              <p className="text-sm md:text-base lg:text-lg">
                {sliders[currentSlider].des}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bus;
