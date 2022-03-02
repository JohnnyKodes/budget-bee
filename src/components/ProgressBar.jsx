import React from "react";

const ProgressBar = ({ max, amount, classNames, ratio, totalCard }) => {
  const width = ratio.toFixed(2).toString() + "%";

  return (
    <div
      className={`w-full bg-gray-200 ${
        totalCard ? "h-8 mb-2" : "h-6 mb-4"
      } rounded-full relative`}
    >
      <div
        className={`${classNames[0]} ${
          totalCard ? "h-8" : "h-6"
        } font-medium text-center flex items-center justify-center rounded-full absolute`}
        style={{ width: width }}
      ></div>
      <p
        className={`${classNames[1]} h-full flex items-center justify-center text-sm text-center w-full z-10 absolute`}
      >
        {width}
      </p>
    </div>
  );
};

export default ProgressBar;
