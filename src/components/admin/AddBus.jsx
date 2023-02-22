import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addBus } from "../../api/admin/adminApi";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

const AddBus = () => {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();
  const [msg, setMsg] = useState();
  const token = useSelector((state) => state.admin.token);
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    start: "",
    drop: "",
    rows: "",
  });

  const handleInput = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.start === "" || formData.drop === "" || formData.rows === "") {
      setError("All fields are required !");
      return false;
    }

    const response = await addBus(formData, token);
    const status = response.status;
    if (status === 200) {
      setFormData({
        start: "",
        drop: "",
        rows: "",
      });
      setMsg(response.data.msg);
    } else {
      navigate("/404");
    }
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
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Add Bus</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              This includes Start loaction , Drop location of Bus .And assgin the no of seat give to agents
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-900 font-medium">Start</label>
                    <input
                      type="text"
                      name="start"
                      onChange={handleInput}
                      value={formData.start}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-900 font-medium">Destination</label>
                    <input
                      type="text"
                      name="drop"
                      value={formData.drop}
                      onChange={handleInput}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-900 font-medium">Number of rows</label>
                    <input
                      type="number"
                      name="rows"
                      value={formData.rows}
                      onChange={handleInput}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    type="submit"
                    className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Button
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddBus;
