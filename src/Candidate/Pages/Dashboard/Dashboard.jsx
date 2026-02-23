import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full  overflow-hidden">
      
      {/* TOPBAR */}
      <Topbar toggleSidebar={() => setSidebarOpen(true)} />

      {/* BODY */}
      <div className="flex pt-3 px-3 gap-3">

        {/* SIDEBAR DESKTOP */}
        <div className="hidden md:block">
          <Sidebar isOpen />
        </div>

        {/* SIDEBAR MOBILE */}
        <Sidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 min-h-[calc(100vh-120px)]">
              <Outlet />
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default Dashboard;
