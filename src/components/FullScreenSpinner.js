import React from "react";

const FullScreenSpinner = () => {
  return (
    <div className="bg-[#181a20] z-10 w-screen h-screen fixed overflow-hidden flex items-center justify-center top-0 left-0 right-0 bottom-0">
      <div className="text-center min-h-[200px] w-full flex items-center justify-center ">
        <div role="status">
          <div className="mb-4 mr-2 w-16 h-16  bg-gradient-to-b from-[#C61548] via-[#C61548] to-red-500 animate-spin dark:white-400 fill-blue-400"></div>
          <span className="">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default FullScreenSpinner;
