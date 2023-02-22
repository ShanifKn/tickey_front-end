import React from "react";
import { Link, useNavigate } from "react-router-dom";
import admin from "../../assets/admin.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { setAdminLogout } from "../../Redux/Slice/adminSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setAdminLogout());
    navigate("/admin/signin");
  };

  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
          <nav className="flex">
            <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <img src={admin} className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" alt="" />
              <span className="ml-3 text-xl">TIcket Booking</span>
            </Link>
            <ul className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
              <Link to="/admin/agent">
                <li className="mr-5 text-xl hover:text-gray-900">Agent</li>
              </Link>
              <Link to="/admin/add-bus">
                <li className="mr-5 text-xl hover:text-gray-900">Add Bus</li>
              </Link>
            </ul>
          </nav>
          <button
            onClick={handleLogout}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Log Out
            <LogoutIcon className="w-4 h-4 ml-1" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
