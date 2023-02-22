import React, { useEffect, useState } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { bookSeats, getAgentList } from "../../api/admin/adminApi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const AgentList = () => {
  const token = useSelector((state) => state.admin.token);
  const [agents, setAgents] = useState([]);
  const [seats, setSeats] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgent = async () => {
      const response = await getAgentList(token);
      const agents = response.agents;
      setAgents(agents);
    };
    fetchAgent();
  }, []);

  const handleSeats = async (id) => {
    if (seats === "") return false;
    const response = await bookSeats(id, parseInt(seats), token);
    const status = response.status;
    if (status === 200) {
      setMsg(response.data.msg);
      setSeats("");
    } else {
      navigate("/404");
    }
  };

  const handleChange = (index, event) => {
    const values = [...seats];
    values[index] = event.target.value;
    setSeats(values);
  };

  return (
    <>
      {msg && (
        <div className="flex w-full mb-5 max-w-sm overflow-hidden bg-white rounded-lg shadow-md ">
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
      {!agents.length == 0 ? (
        <div className="flex flex-wrap -m-4">
          {agents.map((agent, index) => (
            <div key={index} className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img alt="team" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={agent.profile} />
                <div className="flex-grow sm:pl-8">
                  <h2 className="title-font font-medium text-lg text-gray-900">
                    {agent.firstName} {agent.lastName}
                  </h2>
                  <h3 className="text-gray-500 ">{agent.email}</h3>
                  <p className="">
                    {agent.address} {agent.city}
                  </p>
                  <p className="mb-3">+91{agent.phone}</p>
                  {agent.seats && <h3 className="text-black font-medium">Avaiable sets : {agent.seats}</h3>}

                  <span className="inline-flex">
                    <div className="relative">
                      <label>Add seats to agent</label>
                      <input
                        type="number"
                        name="seats"
                        value={seats[index] || ""}
                        onChange={(e) => handleChange(index, e)}
                        className="w-full rounded-md border-gray-200 py-2.5 pr-10 shadow-sm sm:text-sm"
                      />
                      <span className="absolute inset-y-0 right-0 grid w-10 place-content-center">
                        <button
                          onClick={() => handleSeats(agent._id)}
                          type="button"
                          className="rounded-full bg-rose-600 p-0.5 mt-5 text-white hover:bg-rose-700">
                          <ControlPointIcon className="h-4 w-4 " />
                        </button>
                      </span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap -m-4">
          <div className="p-4 lg:w-1/2 ">
            <Link to="/">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                  src="https://dummyimage.com/200x200"
                />
                <div className="flex-grow sm:pl-8">
                  <h2 className="title-font font-medium text-lg text-gray-900">No User Agents Add</h2>
                  <span className="inline-flex">
                    <div className="relative"></div>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default AgentList;
