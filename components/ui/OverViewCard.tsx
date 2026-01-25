import React from "react";

interface OverviewProps {
  title: string;
  value: string;
  icon?: React.ReactNode; // ✅ Accept React component
  bgColor?: string; // Optional background color for icon
  valueColor?: string;
}

const OverViewCard = ({
  title,
  value,
  icon,
  bgColor = "bg-blue-600",
  valueColor,
}: OverviewProps) => {
  return (
    <div className="gradientCard p-4">
      <div className="flex flex-row items-center gap-5 ">
        <div className="w-full mt-3">
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className={`${valueColor} text-[25px] font-bold mt-2`}>
            {value}
          </h3>
        </div>

        {/* Icon and text */}
        <div>
          <div className={`${bgColor} p-3 rounded-lg w-fit`}>
            <div className="text-white text-[20px]">{icon}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverViewCard;
