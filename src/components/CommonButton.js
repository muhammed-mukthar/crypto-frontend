import React from "react";

const CommonButton = ({
  text = "",
  bg = "",
  extraClass = "text-white",
  onClick = () => {},
  disable = false,
}) => {
  return (
    <div className="my-6">
      <button
        disabled={disable}
        onClick={onClick}
        className={`
        bg-gradient-to-b from-[#C61548] via-[#C61548] to-red-500
        ${extraClass} transition-shadow disabled:cursor-no-drop
   border-none  outline-none h-10 rounded-md px-4`}
      >
        {text}
      </button>
    </div>
  );
};

export default CommonButton;
