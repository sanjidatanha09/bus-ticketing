import { MdOutlineWatchLater } from "react-icons/md";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Loader from "../../Utils/Loader/Loader";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [blogDetails, setBlogDetails] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const imgUrl = "https://backend.admissionbus.com/uploads/blog_img/";

  const fetchData = async () => {
    setLoading(true);
    const res = await axiosPublic(`/api/get-single-blog-details/${id}`);
    if (res.data.status_code === 201) {
      setBlogDetails(res.data.singleBlogData);
      setLoading(false);
    } else {
      return setErrMessage("Something Went Wrong.") && setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <p className="my-10 text-center text-cardBG font-semibold text-xl">
        {errMessage}
      </p>
      <div className="rounded-md border-[2px] border-cardBG shadow-xl shadow-shadowColor">
        <div className="w-full h-full overflow-hidden">
          <img
            src={`${imgUrl}${blogDetails?.photo}`}
            alt=""
            className="h-full w-full object-cover group-hover:scale-105 duration-300"
          />
        </div>
        <div className="p-2 mt-3">
          <h1 className="text-xl font-bold">{blogDetails?.title}</h1>
          <h3 className="flex items-center gap-1 mb-3">
            <MdOutlineWatchLater /> <span className="text-xs">20/20/2024</span>
          </h3>
          <div dangerouslySetInnerHTML={{ __html: blogDetails?.post }} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
