import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BeneficiaryCard from "./BeneficiaryCard";

function PersonalInformationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    membertype: "",
    name: "",
    guardianName: "",
    dob: "",
    gender: "",
    idproof: "",
    idnumber: "",
    phoneNo: "",
    address: "",
    city: "",
    pincode: "",
    centerName: "",
    photo: null,
    email: "",
  });

  const [beneficiaries, setBeneficiaries] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/api/beneficiaries/add",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const savedBeneficiary = response.data;
      alert(`Beneficiary registered successfully! ID: ${savedBeneficiary.id}`);
      setBeneficiaries((prev) => [...prev, savedBeneficiary]);

      // Clear form
      setFormData({
        membertype: "",
        name: "",
        guardianName: "",
        dob: "",
        gender: "",
        idproof: "",
        idnumber: "",
        phoneNo: "",
        address: "",
        city: "",
        pincode: "",
        centerName: "",
        email: "",
        photo: null,
      });
      setPhotoPreview(null);
    } catch (error) {
      console.error("Error registering beneficiary:", error);
      alert(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6 max-w-4xl mx-auto">
      {/* Back Arrow */}
      <button onClick={() => navigate(-1)} className="mb-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/109/109618.png"
          alt="Back"
          className="w-10"
        />
      </button>

      <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
        Register a Beneficiary
      </h2>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {[
          { name: "membertype", placeholder: "Beneficiary Type" },
          { name: "name", placeholder: "Full Name" },
          { name: "guardian_name", placeholder: "Guardian's Name" },
          { name: "dob", placeholder: "Date of Birth", type: "date" },
          { name: "idproof", placeholder: "ID Proof Type (Aadhar, etc.)" },
          { name: "idnumber", placeholder: "ID Proof Number" },
          { name: "phoneNo", placeholder: "Phone Number" },
          { name: "address", placeholder: "Address" },
          { name: "city", placeholder: "City" },
          { name: "pincode", placeholder: "Pincode" },
          { name: "centerName", placeholder: "Center Name" },
          { name: "email", placeholder: "Email" },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type || "text"}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        ))}

        {/* Gender Dropdown */}
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Pregnant">Pregnant</option>
          <option value="0-3 years child">0-3 years child</option>
          <option value="3-6 years child">3-6 years child</option>
        </select>

        {/* Upload Photo */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium mb-1">Upload Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded shadow"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="w-72 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow"
          >
            Register Beneficiary
          </button>
        </div>
      </form>

      {/* Beneficiary Cards */}
      {beneficiaries.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-center text-indigo-800 mb-4">
            Registered Beneficiaries
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {beneficiaries.map((ben, idx) => (
              <BeneficiaryCard key={idx} beneficiary={ben} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalInformationForm;
