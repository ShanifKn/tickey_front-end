import React, { useState } from "react";
import DangerousIcon from "@mui/icons-material/Dangerous";
import { formValidation } from "../../api/agent/formValidation";
import { agentRegister } from "../../api/agent/agnetApi";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    city: "",
    picture: "",
  });

  const handleImg = (event) => {
    const image = event.target.files[0];
    const previewUrl = URL.createObjectURL(image);
    setPreview(previewUrl);
    setFormData({ ...formData, picture: image });
  };

  const handleInput = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //* validation*//
    const error = formValidation(formData);
    if (error) {
      setError(error);
      return false;
    }
    //* api request*//
    const response = await agentRegister(formData);
    if (response.status === 404) {
      setError(response.data.msg);
    } else if (response.status === 200) {
      navigate("/login");
    }
  };

  return (
    <>
      <section>
        {error && (
          <div className="flex items-center ml-52 justify-center rounded shadow-md overflow-hidden max-w-xl relative bg-red-200  ">
            <div className="self-stretch flex items-center px-3 flex-shrink-0 ">
              <DangerousIcon className="h-8 w-8" />
            </div>
            <div className="p-4 flex-1">
              <h3 className="text-xl font-bold">Error</h3>
              <p className="text-sm ">{error}</p>
            </div>
          </div>
        )}

        <form className="container flex flex-col mx-auto space-y-5 " onSubmit={handleSubmit}>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm ">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Personal Inormation</p>
              <p className="text-xs text-gray-500">
                Agent must submit validate prove .The agent must comply with the rules and guidelines that have been set by the our tickety.
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label className="text-lg font-medium">First name</label>
                <input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInput}
                  className="w-full rounded-md focus:ring  focus:ring-opacity-75 focus:ring-violet-400  border border-gray-200 shadow-md py-4"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-lg font-medium">Last name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={handleInput}
                  value={formData.lastName}
                  className="w-full rounded-md focus:ring  focus:ring-opacity-75 focus:ring-violet-400 border border-gray-200 shadow-md py-4"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-lg font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={handleInput}
                  value={formData.email}
                  name="email"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border border-gray-200 shadow-md py-4 "
                />
              </div>
              <div className="col-span-full">
                <label className="text-lg font-medium">Address</label>
                <input
                  type="text"
                  placeholder=""
                  name="address"
                  onChange={handleInput}
                  value={formData.address}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border border-gray-200 shadow-md py-4 "
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label className="text-lg font-medium">Phone</label>
                <input
                  type="tel"
                  placeholder="+91"
                  name="phone"
                  onChange={handleInput}
                  value={formData.phone}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border border-gray-200 shadow-md py-4 "
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label className="text-lg font-medium">City</label>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={handleInput}
                  value={formData.city}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border border-gray-200 shadow-md py-4 "
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-lg font-medium">Password</label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleInput}
                  value={formData.password}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border border-gray-200 shadow-md py-4 "
                />
              </div>
              <div className="col-span-full sm:col-span-4">
                <fieldset className="w-full space-y-1 ">
                  <label className="block text-lg font-medium">Attachments</label>
                  <div className="flex">
                    <input type="file" name="image" onChange={handleImg} className="px-8 py-12 border-4 border-dashed rounded-md " />
                  </div>
                </fieldset>
              </div>
              {preview && <img src={preview} alt="" width="100px" height="100px" className="mt-10" />}
            </div>
          </fieldset>
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
              Create a Account
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default SignUp;
