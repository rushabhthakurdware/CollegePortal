// src/pages/Profile.jsx
import React, { useState } from "react";
import { Mail, MapPin, BookOpen, IdCard, User, Home } from "lucide-react";
import profilePic from "../assets/IMG-20250715-WA0004.jpg";
import { useNavigate } from "react-router-dom";


export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "Rushabh Thakurdware",
    address: "Nagpur, India",
    currentEducation: "B.Tech Computer Science",
    pastQualification: "12th Science",
    email: "rushabh@email.com",
    studentId: "STU123456",
    father: "Mr. XYZ",
    mother: "Mrs. ABC",
    profilePhoto: profilePic || defaultPic,
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudent({ ...student, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated Student:", student);
  };

  return (


    <div className="p-8 bg-indigo-600 min-h-screen">

      <button
  onClick={() => navigate("/student")}
  className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
>
  Back
</button>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 flex flex-col items-center text-white">
          <img
            src={student.profilePhoto}
            alt=""
            className="w-40 h-40 rounded-full object-cover shadow-md border-4 border-indigo-500"
          />

          {/* File input only in edit mode */}
          {isEditing && (
            <div className="flex">
              <label className="mt-3 cursor-pointer px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700  ">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />

              
            </label>
             <button
              onClick={() => setStudent({ ...student, profilePhoto: null })}
              className="  ml-3 mt-3 cursor-pointer px-4 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-700 "
            >
              Remove Photo
            </button>
          </div>
          )}

          <h2 className="mt-4 text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {student.name}
          </h2>

          <p className="text-gray-600 dark:text-gray-300">
            {student.currentEducation}
          </p>

          <p className="text-sm text-gray-500 mt-1">{student.studentId}</p>

          {/* Edit/Save Button */}
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {/* Details Section */}
        <div className="md:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
              <User className="w-5 h-5 text-indigo-500" /> Personal Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    value={student.address}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={student.email}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                </>
              ) : (
                <>
                  <p>
                    <MapPin className="inline w-4 h-4 mr-2 text-indigo-500" />{" "}
                    {student.address}
                  </p>
                  <p>
                    <Mail className="inline w-4 h-4 mr-2 text-indigo-500" />{" "}
                    {student.email}
                  </p>
                </>
              )}
              <p>
                <IdCard className="inline w-4 h-4 mr-2 text-indigo-500" />{" "}
                Student ID: {student.studentId}
              </p>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
              <BookOpen className="w-5 h-5 text-indigo-500" /> Education
            </h3>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="currentEducation"
                  value={student.currentEducation}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="pastQualification"
                  value={student.pastQualification}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full"
                />
              </>
            ) : (
              <>
                <p>
                  <span className="font-semibold">Current:</span>{" "}
                  {student.currentEducation}
                </p>
                <p>
                  <span className="font-semibold">Past:</span>{" "}
                  {student.pastQualification}
                </p>
              </>
            )}
          </div>

          {/* Family Details */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
              <Home className="w-5 h-5 text-indigo-500" /> Family Details
            </h3>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="father"
                  placeholder="Enter father's name"
                  value={student.father}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="mother"
                  placeholder="Enter mother's name"
                  value={student.mother}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full text-white"
                />
              </>
            ) : (
              <>
                <p>
                  <span className="font-semibold text-white">Father:</span>{" "}
                  {student.father}
                </p>
                <p>
                  <span className="font-semibold text-white">Mother:</span>{" "}
                  {student.mother}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
