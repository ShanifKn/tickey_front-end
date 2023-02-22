import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getBookedSeats } from "../../api/agent/agnetApi";
import BusSeatings from "./BusSeatings";

const BookingView = () => {
  const [seats, setSeats] = useState([]);
  const [bus, setBus] = useState([]);
  const token = useSelector((state) => state.agent.token);
  const location = useLocation();
  const id = location.state.id;

  useEffect(() => {
    const fetchSeats = async () => {
      const response = await getBookedSeats(id, token);
      const status = response.status;
      setSeats(response.data.seats);
      setBus(response.data.bus);
    };
    fetchSeats();
  }, []);

  return (
    <>
      {bus ? (
        <div>
          <div className=" flex-col items-center gap-9 mt-56">
            <div className="flex justify-center gap-56">
              <h1 className="font-medium text-black">
                Start Location <span className="font-normal text-red-400">{bus.start_location}</span>
              </h1>
              <h1 className="font-medium text-black">
                Drop Location <span className="font-normal text-red-400">{bus.drop_location}</span>
              </h1>
            </div>
            {Object.keys(seats).map((x, index) => (
              <>
                <div className="flex  justify-center ">
                  <BusSeatings bus={bus} i={x} />
                  <br />
                </div>
              </>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen gap-9">
          <fieldset className="grid grid-cols-3 gap-6">
            <div>
              <label className="block cursor-pointer rounded-lg border border-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500">
                <p className="text-gray-700">NO BUS</p>
              </label>
            </div>
          </fieldset>
        </div>
      )}
    </>
  );
};

export default BookingView;
