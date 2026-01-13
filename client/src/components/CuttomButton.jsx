import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyles = "",
  textStyles = "",
  isLoading = false,
}) => {
  return (
    <button
      onClick={handlePress}
      disabled={isLoading}
      className={`
        bg-secondary rounded-3xl  min-h-[40px] px-4 flex  items-center  justify-center transition-opacity w-full
        ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}
      `}
    >
      <span className={`text-white font-bold text-md`}>
        {title}
      </span>
    </button>
  );
};

export default CustomButton;
