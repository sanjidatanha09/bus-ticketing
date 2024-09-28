import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import BtnLoader from "../../../Utils/Loader/BtnLoader";

const AgentLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogOut = async (e) => {
    e.preventDefault();
    setLoading(true);
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const userInfo = {
      mobile: phone,
      password,
    };

    const res = await axios.post(
      "https://admissionbus.com/backendpanel/api/login",
      userInfo
    );
    if (res.data.message === "Login successfully") {
      toast.success("Successfully Login");
      setLoading(false);
      e.target.reset();
      navigate("/");
    }
  };
  return (
    <div className="flex flex-col max-w-xl p-6 rounded-md sm:p-10 bg-primary2 text-primary1 my-10 mx-auto">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Agent Login</h1>
        <p className="text-sm text-primary1">Sign in to access your account</p>
      </div>
      <form onSubmit={handleLogOut} className="space-y-12">
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm">Email address</label>
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="0170000000"
              className="w-full px-3 py-2 border rounded-md border-primary1 bg-transparent text-primary1"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm">Password</label>
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-xs hover:underline text-gray-400"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              className="w-full px-3 py-2 border rounded-md border-primary1 bg-transparent text-primary1"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md bg-cardBG bg-opacity-35 text-primary1 hover:bg-opacity-15 duration-300"
            >
              {loading ? <BtnLoader /> : "Log In"}
            </button>
          </div>
          <p className="px-6 text-sm text-center text-gray-400">
            {"Don't have an account yet?"}
            <Link to="/signUp" className="hover:underline text-primary1 ml-2">
              Sign up
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default AgentLogin;
