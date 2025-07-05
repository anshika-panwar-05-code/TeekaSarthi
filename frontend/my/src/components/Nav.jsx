import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = ({ userName = "User", onTextSizeChange, currentSize = "base" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const textSizeButtons = ["sm", "base", "lg"];

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <h1 className="text-2xl font-bold text-blue-700">Teeka Sarthi</h1>
       
      </div>

      <div className="flex items-center gap-4">
        {/* Text Size Control */}
        

        {/* Navigation Buttons */}
        <button
          onClick={() => navigate("/add-beneficiary")}
          className="text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Beneficiaries
        </button>
        <button
          onClick={() => navigate("/add-beneficiary")}
          className="text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Add Beneficiary
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 cursor-pointer rounded-lg text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;
