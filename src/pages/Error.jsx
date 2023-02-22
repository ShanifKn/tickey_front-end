import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div className="grid h-screen px-4 bg-white place-content-center">
        <div className="text-center">
          <h1 className="mt-6 text-9xl font-bold tracking-tight text-gray-900 sm:text-4xl">404</h1>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</h1>

          <p className="mt-4 text-gray-500">We can't find that page.</p>
          <Link to="/">
            <button className="border border-red-500 px-5 py-3 mt-5">Home</button>
          </Link>
        </div>
      </div>
      #
    </>
  );
};

export default ErrorPage;
