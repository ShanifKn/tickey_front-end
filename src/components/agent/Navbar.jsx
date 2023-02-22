import React from "react";
import admin from "../../assets/admin.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../../Redux/Slice/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap justify-between p-5 flex-col md:flex-row items-center">
          <Link to="/agent/home">
            <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <img src={admin} className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" alt="" />
              <span className="ml-3 text-xl">Tickety</span>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Logout
            <LogoutIcon className="w-4 h-4 ml-1" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
