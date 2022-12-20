import React from "react";

const Heading = ({ text }) => {
  return (
    <div className="max-w-[80%] m-auto">
      <div className="text-white flex items-center">
        <div className="bg-red-500 w-full h-1"></div>
        <p className=" md:w-4/6 mx-4 text-xl">{text}</p>
        <div className="bg-red-500 w-full h-1"></div>
      </div>
    </div>
  );
};

export default Heading;
