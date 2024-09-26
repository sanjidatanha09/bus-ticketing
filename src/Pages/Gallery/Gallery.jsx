import { useContext, useEffect, useState } from "react";
import ImageModal from "../../Utils/Modal/ImageModal";
import { BusProvider } from "../../Provider/BusContext";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../../Utils/Loader/Loader";

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setModalImage } = useContext(BusProvider);
  const axiosPublic = useAxiosPublic();
  const imgUrl = "https://backend.admissionbus.com/uploads/galleryPhoto/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await axiosPublic("/api/get-gallery-list");
    setGalleryData(res.data.photoGalleryData);
    setLoading(false);
    if (res.data.blogData?.length === 0) {
      setErrMessage("No Blog Data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImg = (img) => {
    setIsOpen(true);
    setModalImage(`${imgUrl}${img}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <p className="my-10 text-center text-cardBG font-semibold text-xl">
        {errMessage}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 justify-center">
        {galleryData?.map((img, idx) => (
          <div
            key={idx}
            onClick={() => handleImg(img?.photo)}
            className="w-full h-72 overflow-hidden rounded-md border-[4px] border-cardBG shadow-xl shadow-shadowColor"
          >
            <img
              src={`${imgUrl}${img?.photo}`}
              alt=""
              className="h-full w-full object-cover group-hover:scale-105 duration-300"
            />
          </div>
        ))}
      </div>
      <ImageModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Gallery;
