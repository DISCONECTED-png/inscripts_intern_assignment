import { useState } from "react";

const tabs = ["All Orders", "Pending", "Reviewed", "Arrived"];

const TabBar = () => {
  const [active, setActive] = useState("All Orders");

  return (
    <div className="flex gap-2 p-3 bg-white text-sm fixed bottom-0 left-0 w-full">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-3 py-1 rounded ${
            active === tab
              ? "border-b-2 border-green-600 text-green-700 font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => {setActive(tab);
          console.log("Clicked")} }
        >
          {tab}
        </button>
      ))}
      <button className="ml-2 text-xl font-bold">+</button>
    </div>
  );
};

export default TabBar;
