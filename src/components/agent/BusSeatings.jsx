import React from "react";

const BusSeatings = ({ bus, i }) => {
  return (
    <>
      <fieldset className="flex grid-cols-3 gap-6">
        {bus.seats[i].map((seat, index) => (
          <div>
            <label
              className={
                seat.agent 
                  ? "block cursor-pointer rounded-lg border mt-5 border-gray-500 p-4 bg-red-300 text-sm font-medium shadow-sm hover:border-gray-200"
                  : "block cursor-pointer rounded-lg border mt-5 border-gray-500 p-4  text-sm font-medium shadow-sm hover:border-gray-200"
              }>
              <p className="text-gray-700">{seat.seatNumber}</p>
              <p className="mt-1 text-gray-900"></p>
            </label>
          </div>
        ))}
      </fieldset>
    </>
  );
};

export default BusSeatings;
