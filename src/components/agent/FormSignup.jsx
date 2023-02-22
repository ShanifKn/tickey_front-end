import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DangerousIcon from "@mui/icons-material/Dangerous";
import { agentLogin } from "../../api/agent/agnetApi";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Redux/Slice/userSlice";
import { validateFrom } from "../../api/agent/formValidation";

const FormSignin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // * LOGIN USER *//
  const hanldeSubmit = async (event) => {
    event.preventDefault();
    //* validation*//
    const error = validateFrom(formData);
    if (error) {
      setError(error);
      return false;
    }

    const response = await agentLogin(formData.email, formData.password);

    if (response.status === 400) {
      setError(response.data.error);
    } else if (response.status === 500) {
      navigate("/404");
    } else {
      dispatch(
        setLogin({
          user: `${response.data.Agent.firstName} ${response.data.Agent.lastName}`,
          token: response.data.token,
        })
      );
      navigate("/agent/home");
    }
  };

  return (
    <>
      {error && (
        <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md mt-10">
          <div className="flex items-center justify-center w-12 bg-red-500">
            <DangerousIcon className="w-6 h-6 text-white fill-current" />
          </div>

          <div className="px-4 py-2 -mx-3">
            <div className="mx-3">
              <span className="font-semibold text-red-500 ">Error</span>
              <p className="text-sm text-gray-600 ">{error}</p>
            </div>
          </div>
        </div>
      )}
      <form className="mt-8 grid grid-cols-7 gap-6" onSubmit={hanldeSubmit}>
        <div className="col-span-6">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
            className="mt-1 w-full rounded-md py-2 border  border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
            className="mt-1 w-full rounded-md py-2 border  border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6">
          <p className="text-sm text-gray-500">
            Being our partner,you agree to our
            <span className="text-gray-700 underline mx-1">
              terms and conditions
            </span>
            and
            <span className="text-gray-700 underline mx-1">privacy policy</span>
            .
          </p>
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
            Login
          </button>
          <Link to="/admin/signin">
            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Login as Admin
              <span className="text-gray-700 underline ml-1 hover:text-xl">
                Log in
              </span>
              .
            </p>
          </Link>
        </div>
      </form>
    </>
  );
};

export default FormSignin;
