import React from "react";

const SummaryCard = ({ icon, number, text, color }) => {
  return (
    <div className="flex bg-white rounded">
      <div
        className={`text-white w-20 flex justify-center items-center text-3xl ${color}`}
      >
        {icon}
      </div>
      <div className="pl-4 py-1">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
