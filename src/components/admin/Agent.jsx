import React from "react";
import AgentList from "./AgentList";

const Agent = () => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">OUR TEAM</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Our team is a group of individuals with diverse backgrounds and expertise who are committed to working together to achieve a common
              goal. We value open communication, collaboration, and creativity, and strive to foster an environment where everyone feels heard and
              respected. Our team is dedicated to delivering high-quality results and takes pride in our work.
            </p>
          </div>
          <AgentList />
        </div>
      </section>
    </>
  );
};

export default Agent;
