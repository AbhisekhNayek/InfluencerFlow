import React, { useState } from "react";
import {
  BarChart2,
  Rocket,
  History,
  Activity,
  Wallet,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { name: "Overview", icon: BarChart2, href: "/overview", color: "#8B5CF6" },
  { name: "Launch Campaign", icon: Rocket, href: "/launch", color: "#10B981" },
  { name: "Previous Campaigns", icon: History, href: "/previous", color: "#3B82F6" },
  { name: "Analytics", icon: Activity, href: "/analytics", color: "#6EE7B7" },
  { name: "Wallet", icon: Wallet, href: "/wallet", color: "#6366F1" },
];

const icons = {
  notification: <Bell size={20} color="#F59E0B" />,
  profile: <User size={20} color="#3B82F6" />,
  settings: <Settings size={20} color="#6EE7B7" />,
  logout: <LogOut size={20} color="#DC2626" />,
};

const Sidebar = ({ activeTab, setActiveTab, onCollapse }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
    if (onCollapse) {
      onCollapse(!collapsed)
    }
  };

  const handleItemClick = (name) => {
    const formattedName = name.toLowerCase().replace(/\s+/g, '-');
    setActiveTab(formattedName);
  };


  return (
    <div
      className={` ${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-[#104581] text-white flex flex-col justify-between transition-all duration-300 p-4 shadow-lg fixed top-4 left-4 rounded-xl z-50`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {!collapsed && <div className="text-xl font-bold ml-2">MicroMatch</div>}
          <button onClick={toggleSidebar}>
            {collapsed ? (
              <ChevronsRight className="w-6 h-6" />
            ) : (
              <ChevronsLeft className="w-6 h-6" />
            )}
          </button>
        </div>
    
        {/* Nav Items */}
        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <div
              key={item.name}
              onClick={() => handleItemClick(item.name)}
              className={`flex items-center p-3 rounded-lg cursor-pointer mb-2 transition-colors ${
                activeTab === item.name.toLowerCase().replace(/\s+/g, '-')
                  ? "bg-white text-[#104581] font-semibold"
                  : "hover:bg-blue-800"
              }`}
            >
              <item.icon size={20} style={{color: item.color}}/>
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </div>
          ))}
        </nav>
      </div>
      {/* Profile Section */}
      <div className="flex items-center gap-3 p-3 bg-blue-800 rounded-lg cursor-pointer hover:bg-blue-900">
        <div className="w-8 h-8 rounded-full bg-white text-[#104581] font-bold flex items-center justify-center">
          FG
        </div>
        {!collapsed && <div className="text-sm">First Gear Cafe</div>}
      </div>
    </div>
  );
};

export { Sidebar, icons };
