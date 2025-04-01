import SubHeader from "@/components/SubHeader";
import React from "react";

function AdminDashboard() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen h-16 bg-gradient-to-b from-black to-gray-900 text-white">
        <SubHeader />
        <div className="w-full h-full overflow-x-hidden">
          <div className="flex space-x-5">
            Admin Dashboard
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
