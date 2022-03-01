import React from "react";

const ProgressBar = ({ max, amount, classNames, ratio }) => {
  const width = ratio.toString() + "%";

  return (
    <div className="w-full bg-gray-200 h-6 mb-6 rounded-full">
      <div
        className={`${classNames.join(
          " "
        )} h-6 text-xs font-medium text-center p-0.5 leading-none rounded-full`}
        style={{ width: width }}
      >
        {ratio}%
      </div>
    </div>
  );
};

export default ProgressBar;
