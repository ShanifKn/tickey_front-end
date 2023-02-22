import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addBooking, getAvaSeats } from "../../api/agent/agnetApi";

const Booking = () => {
  const [passengers, setPassengers] = useState([{ name: "", sex: "", age: "" }]);
  const [agent, setAgent] = useState([]);
  const [error, setError] = useState();
  const token = useSelector((state) => state.agent.token);
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;

  const hanldePassenger = () => {
    setPassengers([...passengers, { name: "", sex: "", age: "" }]);
  };

  const handleRemove = (index) => {
    const list = [...passengers];
    list.splice(index, 1);
    setPassengers(list);
  };

  const handleInput = (e, index) => {
    const { value, name } = e.target;
    const list = [...passengers];
    list[index][name] = value;
    setPassengers(list);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await addBooking(passengers, id, token);
    const status = response.status;
    if (status === 30) {
      setError(response.data.msg);
    } else if (status === 500) {
      navigate("/404");
    } else {
      navigate("/agent/home");
    }
  };

  useEffect(() => {
    const fetchSeats = async () => {
      const response = await getAvaSeats(token);
      const status = response.status;
      if (status === 200) {
        setAgent(response.data.agent);
      } else {
        navigate("/404");
        2;
      }
    };
    fetchSeats();
  }, []);

  return (
    <>
      {error && (
        <div className="rounded border-l-4 ml-56 mt-5 border-red-500 bg-red-50 p-4 w-56 mb-10 ">
          <strong className="block font-medium text-red-800  ">{error}</strong>
        </div>
      )}
      {agent.seats  > 0 ? (
        <section className="text-gray-600 body-font relative">
          <form onSubmit={handleSubmit}>
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-col text-center w-full mb-12">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Ticket Booking Form</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">You Can Only Book {agent.seats} avaiable seats at a single Booking. </p>
              </div>
              {passengers.map((singlepassengers, index) => (
                <div key={index} className="lg:w-1/2 md:w-2/3 mx-auto">
                  <h1 className="font-medium text-gray-700 mb-2 mt-2">Passeger {index + 1}</h1>
                  <div className="flex flex-wrap -m-2">
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <label className="leading-7 text-sm text-gray-600">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={passengers.name}
                          onChange={(e) => handleInput(e, index)}
                          required
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <label className="leading-7 text-sm text-gray-600">Age</label>
                        <input
                          type="number"
                          name="age"
                          value={passengers.age}
                          onChange={(e) => handleInput(e, index)}
                          required
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <label className="leading-7 text-sm text-gray-600">Sex</label>
                        <input
                          type="text"
                          name="sex"
                          value={passengers.sex}
                          onChange={(e) => handleInput(e, index)}
                          placeholder="Male / Female"
                          required
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="flex w-full">
                      {passengers.length - 1 === index && passengers.length < agent.seats && (
                        <div className="p-2 w-full">
                          <button
                            onClick={hanldePassenger}
                            className="flex  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                            Add Passengers
                          </button>
                        </div>
                      )}
                      {passengers.length - 1 === index && passengers.length > 1 && (
                        <div className="p-2 w-full">
                          <button
                            onClick={() => handleRemove(index)}
                            className="flex  text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="flex  text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                BOOK
              </button>
            </div>
          </form>
        </section>
      ) : (
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Ticket Booking Form</h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">You Can Only Book Seats Avaiable for you</p>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <h1 className="font-medium text-gray-700 mb-2 mt-2"></h1>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Booking;
