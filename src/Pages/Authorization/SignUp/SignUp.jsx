import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import BtnLoader from "../../../Utils/Loader/BtnLoader";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const mobile = e.target.phone.value;
    const email = form.email.value;
    const address = form.address.value;
    const password = form.password.value;
    const password_confirmation = form.password_confirmation.value;
    const image = form.photo.files[0];
    const gender = form.gender.value;

    const userInfo = {
      name,
      mobile,
      email,
      password,
      password_confirmation,
      gender,
      address,
      image,
    };

    try {
      const res = await axios.post(
        "https://backend.admissionbus.com/api/register",
        userInfo
      );
      if (res.data.userData) {
        toast.success("Registration Successful");
        setLoading(false);
        navigate("/agentLogin");
        e.target.reset();
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.errors);
    }
  };

  return (
    <div className="flex flex-col max-w-3xl p-6 rounded-md sm:p-10 bg-primary2 text-primary1 my-10 mx-auto">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
      </div>
      <form onSubmit={handleSignUp} className="space-y-12">
        <div className="space-y-4">
          <div className="md:flex gap-3">
            <div className="w-full">
              <label className="block mb-2 text-sm">Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-3 py-2 border rounded-md border-primary1 bg-transparent text-primary1"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm">Phone *</label>
              <input
                type="number"
                name="phone"
                placeholder="0170000000"
                required
                className="w-full px-3 py-2 border rounded-md border-primary1 bg-transparent text-primary1"
              />
            </div>
          </div>
          <div className="md:flex gap-3">
            <div className="w-full">
              <label className="block mb-2 text-sm">Email *</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full px-3 py-2 border rounded-md border-primary1 bg-transparent text-primary1"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm">Address *</label>
              <input
                type="text"
                name="address"
                required
                placeholder="Your Address"
                className="w-full px-3 py-2 border rounded-md border-primary1 bg-transparent text-primary1"
              />
            </div>
          </div>
          <div className="md:flex gap-3">
            <div className="w-full">
              <div className="flex justify-between mb-2">
                <label className="text-sm">Password *</label>
              </div>
              <input
                type="password"
                name="password"
                placeholder="*****"
                required
                className="w-full px-3 py-2 border rounded-md border-primary1 bg-transparent text-primary1"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm">Confirm Password *</label>
              <input
                type="password"
                name="password_confirmation"
                required
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md border-primary1 bg-transparent text-primary1"
              />
            </div>
          </div>
          <div className="md:flex gap-3">
            <div className="w-full">
              <label className="block mb-2 text-sm">Select Gender *</label>
              <select
                name="gender"
                required
                className="select border border-primary1 rounded-md py-3 w-full bg-transparent"
              >
                <option className="bg-primary2 text-lg">Male</option>
                <option className="bg-primary2 text-lg">Female</option>
                <option className="bg-primary2 text-lg">Others</option>
              </select>
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm">Image</label>
              <input
                type="file"
                name="photo"
                placeholder="Your Address"
                className="w-full px-3 py-2 border rounded-md border-primary1 bg-transparent text-primary1"
              />
            </div>
          </div>
          {error && (
            <p className="text-cardBG text-sm font-semibold">{error}</p>
          )}
        </div>

        <div className="space-y-2">
          <div>
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md bg-cardBG bg-opacity-35 text-primary1 hover:bg-opacity-15 duration-300"
            >
              {loading ? <BtnLoader /> : "Sign Up"}
            </button>
          </div>
          <p className="px-6 text-sm text-center text-gray-400">
            {"Don't have an account yet?"}
            <Link
              to="/agentLogin"
              className="hover:underline text-primary1 ml-2"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
