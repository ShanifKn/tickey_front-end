import React from "react";
import Logo from "../../assets/login.png";
import Bus from "../../assets/bus.jpg";
import FormSignin from "./FormSignup";

const Signin = () => {
  return (
    <>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Pattern"
              src={Bus}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="block text-blue-600">
                <img
                  src={Logo}
                  alt="logo"
                  className="h-8 sm:h-10 text-blue-600"
                />
              </div>

              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to tickety 🚌
              </h1>
              <FormSignin />
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Signin;
