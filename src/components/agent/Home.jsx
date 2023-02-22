import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBusList } from "../../api/agent/agnetApi";

const Home = () => {
  const token = useSelector((state) => state.agent.token);
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBus = async () => {
      const response = await getBusList(token);
      const status = response.status;
      if (status === 200) {
        setBuses(response.data.buses);
      } else {
        navigate("/404");
      }
    };
    fetchBus();
  }, []);

  const handleBooking = (id) => {
    navigate("/agent/booking", { state: { id: id } });
  };

  const handleBookingView = (id) => {
    navigate("/agent/booking/view", { state: { id: id } });
  };
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Buses 🚐</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Avaiable bus for booking</p>
          </div>
          <div className="lg:w-3/5 w-full mx-auto overflow-auto">
            {buses ? (
              <table className="table-auto w-full text-left whitespace-no-wrap border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-300 rounded-tl rounded-bl">
                      Pick up
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-300">Drop off</th>
                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-300 rounded-tr rounded-br"></th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map((bus, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3">{bus.start_location}</td>
                      <td className="px-4 py-3">{bus.drop_location}</td>
                      <td className="text-center flex gap-4 mt-2 mb-2">
                        <button
                          type="button"
                          onClick={() => handleBookingView(bus._id)}
                          className="px-8 py-2 font-semibold rounded bg-gray-600 text-black">
                          view
                        </button>
                        <button
                          type="button"
                          onClick={() => handleBooking(bus._id)}
                          className="px-8 py-2 font-semibold rounded bg-blue-500 text-gray-800">
                          Book
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                      Pick up
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 w-full text-gray-900 ">No Buses Add still</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
