import React from "react";
import login from "../../assets/login.png";
import FormLoginAdmin from "./FormLoginAdmin";

const Login = () => {
  return (
    <>
      <section className="bg-white  ">
        <div className="h-screen flex justify-center items-center  ">
          <main>
            <div className="max-w-xl lg:max-w-5xl md:border rounded-xl shadow-2xl md:p-24 ">
              <div className=" text-blue-600 flex  justify-center items-center">
                <img src={login} alt="" className="h-8 mt-5 mr-2 sm:h-10" />
                <h1 className="mt-6 text-2xl font-bold text-gray-900  sm:text-3xl md:text-4xl">
                  Admin
                </h1>
              </div>

              <FormLoginAdmin />
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Login;
