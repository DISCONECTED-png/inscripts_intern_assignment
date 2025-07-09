import React from "react";

type Props = {
  status: "In-process" | "Complete" | "Blocked" | "Not started";
};

const colorMap = {
  "In-process": "bg-yellow-100 text-yellow-700",
  Complete: "bg-green-100 text-green-700",
  Blocked: "bg-red-100 text-red-700",
  "Not started": "bg-gray-100 text-gray-700",
};

const StatusBadge: React.FC<Props> = ({ status }) => {
  return (
    <span
      className={`text-sm font-medium px-2 py-1 rounded-full ${colorMap[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
