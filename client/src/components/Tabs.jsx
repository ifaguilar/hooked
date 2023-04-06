import React, { useState } from "react";

// Components
import MenuItem from "./MenuItem";
import MenuHeading from "./MenuHeading";

const Tabs = ({ tabList }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col md:flex-row md:flex-grow gap-4 lg:gap-8">
      <div className="w-full md:w-64 py-8 rounded-lg shadow-2xl bg-white dark:bg-neutral-900">
        <MenuHeading>Settings</MenuHeading>
        {tabList.map((tab, index) => (
          <MenuItem
            key={index}
            icon={tab.icon}
            text={tab.name}
            isActive={activeTab === index ? true : false}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </div>
      <div className="flex-grow p-8">
        {tabList.map((tab, index) => (
          <div
            key={index}
            style={{ display: activeTab === index ? "block" : "none" }}
          >
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
