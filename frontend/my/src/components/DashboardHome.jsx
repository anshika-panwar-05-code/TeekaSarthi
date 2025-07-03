import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


const DashboardHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = location.pathname.split("/").pop(); // dashboard or register

  const [formData, setFormData] = useState({
    membertype: "",
    name: "",
    dob: "",
    gender: "",
    idproof: "",
    idnumber: "",
    phoneNo: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [beneficiaryId, setBeneficiaryId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/beneficiaries/add",
        formData
      );
      alert("Beneficiary registered successfully!");
      const savedBeneficiary = response.data;
      setBeneficiaryId(savedBeneficiary.id);

      setFormData({
        membertype: "",
        name: "",
        dob: "",
        gender: "",
        idproof: "",
        idnumber: "",
        phoneNo: "",
        address: "",
        city: "",
        pincode: "",
      });
    } catch (error) {
      console.error("Error registering beneficiary:", error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
     
      {/* Welcome Section */}
      {currentTab === "dashboard" && (
        <div className="bg-white p-10 rounded-xl shadow text-center max-w-3xl mx-auto">
          <img
            src="https://answers.childrenshospital.org/wp-content/uploads/2021/03/COVID-Vaccinated_image.jpg"
            alt="Family"
            className="mx-auto w-100 h-40 md:w-60 mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome</h2>
          <p className="text-gray-600 mb-6">
            You can register <strong>family members</strong> for vaccination.
          </p>
          <button
            onClick={() => navigate("/add-beneficiary")}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-2 px-6 rounded-lg shadow"
          >
            Register Member
          </button>
        </div>
      )}

      {/* Registration Form */}
      {currentTab === "register" && (
        <div className="bg-white p-6 rounded-lg shadow mb-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Register a Beneficiary</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {[
              ["membertype", "Member Type", "text"],
              ["name", "Name", "text"],
              ["dob", "Date of Birth", "date"],
              ["gender", "Gender", "select"],
              ["idproof", "ID Proof", "text"],
              ["idnumber", "ID Number", "text"],
              ["phoneNo", "Phone Number", "text"],
              ["address", "Address", "text"],
              ["city", "City", "text"],
              ["pincode", "Pincode", "text"],
            ].map(([name, label, type]) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">{label}</label>
                {type === "select" ? (
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder={label}
                  />
                )}
              </div>
            ))}

            <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="w-72 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-3 rounded-lg shadow"
              >
                Register Beneficiary
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Schedule Component */}
      {beneficiaryId && (
        <div className="bg-white p-6 rounded-lg shadow mt-6 max-w-4xl mx-auto">
          <ScheduleList beneficiaryId={beneficiaryId} />
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
