import React, { useState } from "react";
import Navbar from "./Navbar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";

const CreateLocation = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState({
    locationName: "",
    address: "",
    city: "",
    state: "",
    locationDetails: "",
  });

  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axiosPrivate
      .post("/api/locations", location)
      .then((res) => {
        navigate("/newEvent");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="bg-gray-900 dark:bg-gray-900">
      {/* nav bar */}
      <div>{<Navbar />}</div>
      <div className="flex flex-col items-center justify-center mx-auto md:h-screen">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-900 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Create a Location
            </h1>
            <form className="space-y-4" onSubmit={submitHandler}>
              {/* Location Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Location Name
                </label>
                <input
                  type="text"
                  name="locationName"
                  className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Location Name"
                  value={location.locationName}
                  onChange={handleChange}
                />
                {errors.locationName ? (
                  <p className="text-red-600">{errors.locationName.message}</p>
                ) : null}
              </div>
              {/* location address */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1234 Main St."
                  value={location.address}
                  onChange={handleChange}
                />
              </div>
              {/* location city */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Burbank"
                  value={location.city}
                  onChange={handleChange}
                />
              </div>
              {/* location state */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-900 border-gray-600 dark:placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="California"
                  value={location.state}
                  onChange={handleChange}
                />
              </div>
              {/* location details */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Location Details
                </label>
                <textarea
                  rows="4"
                  name="locationDetails"
                  className="block p-2.5 w-full text-sm  rounded-lg border  focus:ring-blue-500  bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-blue-500"
                  placeholder="Meet-up spots, Field Number, etc.."
                  value={location.locationDetails}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="py-1">
                  <button
                    type="submit"
                    className=" border border-gray-700 text-sm rounded-lg hover:bg-blue-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
                  >
                    Create Location
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* cancel button */}
        </div>
          <div className="mt-3">
                  <Link to="/newEvent"> <button className="border border-gray-700 text-sm hover:bg-red-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white">Cancel</button></Link>
          </div>
      </div>
    </div>
  );
};

export default CreateLocation;
