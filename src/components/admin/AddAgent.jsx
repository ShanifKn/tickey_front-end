import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { inviteAgent } from "../../api/admin/adminApi";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useSelector } from "react-redux";
import { Password } from "@mui/icons-material";
import { validatefrom } from "../../api/agent/formValidation";

const AddAgent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const token = useSelector((state) => state.admin.token);

  const handleInvite = async (event) => {
    event.preventDefault();
    
    // * validation *//
    const error = validatefrom(email, Password);
    if (error) {
      setError(error);
      return false;
    }

    // * SEND REQUEST *//
    const response = await inviteAgent(email, name, token);
    const status = response.status;
    if (status === 200) {
      setEmail();
      setMsg(response.data.msg);

      setTimeout(() => {
        setMsg();
      }, 2000);
    }
    if (status === 404) setError(response.data.msg);
    if (status === 500) navigate("/404");
  };

  return (
    <>
      {msg && (
        <div className="flex w-full float-right mt-10 max-w-sm overflow-hidden bg-white rounded-lg shadow-md ">
          <div className="flex items-center justify-center w-12 bg-emerald-500">
            <CheckCircleOutlineIcon className="w-6 h-6 text-white fill-current" />
          </div>

          <div className="px-4 py-2 -mx-3">
            <div className="mx-3">
              <span className="font-semibold text-emerald-500 ">Success</span>
              <p className="text-sm text-gray-600 ">{msg}</p>
            </div>
          </div>
        </div>
      )}

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            {error && (
              <div className="rounded border-l-4 border-red-500 bg-red-50 p-4 w-56 mb-10 ">
                <strong className="block font-medium text-red-800  ">{error}</strong>
              </div>
            )}

            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 capitalize">To invite New agent</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              As an admin, you may need to invite an agent who can start booking tickets on behalf of your business
            </p>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label className="leading-7 text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative flex-grow w-full">
              <label className="leading-7 text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              onClick={handleInvite}
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Invite
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddAgent;
