import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { login } from "../../api/admin/adminApi";
import { useDispatch } from "react-redux";
import { setAdminLogin } from "../../Redux/Slice/adminSlice";
import { validateFrom } from "../../api/agent/formValidation";

const FormLoginAdmin = () => {
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // * FORM SUBMIT *//
  const hanldeSubmit = async (event) => {
    event.preventDefault();
    //* validation*//
    const error = validateFrom(formData);
    if (error) {
      setError(error);
      return false;
    }

    const response = await login(formData.email, formData.password);
    if (response.status === 400) {
      setError(response.data.error);
    } else if (response.status === 500) {
      navigate("/404");
    } else {
      dispatch(
        setAdminLogin({
          user: response.admin.userName,
          token: response.token,
        })
      );
      navigate("/");
    }
  };

  return (
    <>
      {error && (
        <div class="rounded-xl border border-red-500 p-4 shadow-xl mt-2 bg-red-300">
          <div class="flex items-start gap-4">
            <span class="text-red-600">
              <PriorityHighIcon />
            </span>

            <div class="flex-1">
              <strong class="block font-medium text-gray-900">{error}</strong>
            </div>

            <button onClick={() => setError()} class="text-gray-500 transition hover:text-gray-600">
              <HighlightOffIcon />
            </button>
          </div>
        </div>
      )}

      <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={hanldeSubmit}>
        <div className="col-span-6">
          <label className="block text-sm font-medium text-gray-700  ">Email</label>

          <input
            type="email"
            name="email"
            onChange={handleInput}
            value={formData.email}
            className="mt-1 w-full rounded-md py-2 border border-gray-400 bg-white text-sm text-gray-700 shadow-sm  "
          />
        </div>

        <div className="col-span-6">
          <label className="block text-sm font-medium text-gray-700 ">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
            className="mt-1 w-full rounded-md py-2 border border-gray-400 bg-white text-sm text-gray-700 shadow-sm  "
          />
        </div>
        <div className="col-span-6 sm:flex sm:items-center sm:gap-4 ">
          <button
            type="submit"
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white">
            Login
          </button>
          <Link to="/login">
            <p className="mt-4 text-sm text-gray-500 sm:mt-0 ">
              Login As Agent
              <span className="text-gray-700 underline ml-1 hover:text-blue-500">Login.</span>
            </p>
          </Link>
        </div>
      </form>
    </>
  );
};

export default FormLoginAdmin;
