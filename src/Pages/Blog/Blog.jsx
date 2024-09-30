/* eslint-disable react-hooks/rules-of-hooks */
import { MdOutlineWatchLater } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Loader from "../../Utils/Loader/Loader";

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const [blog, setBlog] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const imgUrl = "https://admissionbus.com/backendpanel/uploads/blog_img/";

  const fetchData = async () => {
    setLoading(true);
    const res = await axiosPublic("/api/get-blog-list");
    if (res.data.status_code === 201) {
      setBlog(res.data);
      setLoading(false);
      if (res.data.blogData.length === 0) {
        setErrMessage("No Blog Data");
      }
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
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <p className="my-10 text-center text-cardBG font-semibold text-xl">
        {errMessage}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
        {blog?.blogData?.map((item, idx) => (
          <div
            key={idx}
            className="rounded-md border-[2px] border-cardBG shadow-xl shadow-shadowColor group"
          >
            <div className="w-full h-60 overflow-hidden">
              <img
                src={`${imgUrl}${item?.photo}`}
                alt=""
                className="h-full w-full object-cover group-hover:scale-105 duration-300"
              />
            </div>
            <div className="p-2">
              <h1 className="text-xl font-bold">{item?.title}</h1>
              <h3 className="flex items-center gap-1 mb-3">
                <MdOutlineWatchLater />{" "}
                <span className="text-xs">{item?.created_at}</span>
              </h3>
              {/* <p>
                {
                    `${item?.solid_post.split(" ").slice(0, 30).join(" ")} .......`
                }
              </p> */}
              <div
                dangerouslySetInnerHTML={{
                  __html: item?.solid_post.split(" ").slice(0, 30).join(" "),
                }}
              />
              <div className="mt-2">
                <Link
                  to={`/blogDetails/${item?.id}`}
                  className="hover:bg-cardBG duration-300 bg-primary3 px-3 py-1 border-none text-primary2 font-semibold"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
