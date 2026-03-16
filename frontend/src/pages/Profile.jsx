// src/pages/Profile.jsx
import React, { useState } from "react";
import {
  Mail,
  MapPin,
  BookOpen,
  IdCard,
  User,
  Home,
  Camera,
  Edit3,
  Save,
} from "lucide-react";
import profilePic from "../assets/IMG-20250715-WA0004.jpg";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [student, setStudent] = useState({
    name: "Rushabh Thakurdware",
    address: "Nagpur, India",
    currentEducation: "B.Tech Computer Science",
    pastQualification: "12th Science",
    email: "rushabh@email.com",
    studentId: "STU123456",
    father: "Mr. XYZ",
    mother: "Mrs. ABC",
    profilePhoto: profilePic,
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8">

      {/* Back Button */}
      <button
        onClick={() => navigate("/student")}
        className="mb-6 px-5 py-2 bg-white/20 backdrop-blur-lg text-white rounded-xl hover:bg-white/30 transition-all"
      >
        ⬅ Back
      </button>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* PROFILE CARD */}
        <div className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-8 flex flex-col items-center text-white border border-white/30 transition hover:scale-105 duration-300">

          {/* Profile Image */}
          <div className="relative group">
            <img
              src={student.profilePhoto}
              alt=""
              className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-xl"
            />

            {isEditing && (
              <label className="absolute bottom-2 right-2 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition">
                <Camera size={18} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
            )}
          </div>

          <h2 className="mt-5 text-2xl font-bold tracking-wide">
            {student.name}
          </h2>

          <p className="text-white/80 mt-1">
            {student.currentEducation}
          </p>

          <p className="text-sm text-white/60 mt-2">
            {student.studentId}
          </p>

          {/* Edit / Save Button */}
          <button
            onClick={() =>
              isEditing ? handleSave() : setIsEditing(true)
            }
            className="mt-6 flex items-center gap-2 px-6 py-2 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-md"
          >
            {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
            {isEditing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>

        {/* DETAILS SECTION */}
        <div className="md:col-span-2 space-y-6">

          {/* Personal Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-indigo-600">
              <User size={18} /> Personal Information
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="address"
                    value={student.address}
                    onChange={handleChange}
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </>
              ) : (
                <>
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-indigo-500" />
                    {student.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={16} className="text-indigo-500" />
                    {student.email}
                  </p>
                </>
              )}

              <p className="flex items-center gap-2">
                <IdCard size={16} className="text-indigo-500" />
                Student ID: {student.studentId}
              </p>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-indigo-600">
              <BookOpen size={18} /> Education
            </h3>

            {isEditing ? (
              <>
                <input
                  type="text"
                  name="currentEducation"
                  value={student.currentEducation}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full mb-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <input
                  type="text"
                  name="pastQualification"
                  value={student.pastQualification}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </>
            ) : (
              <>
                <p>
                  <span className="font-semibold text-indigo-600">
                    Current:
                  </span>{" "}
                  {student.currentEducation}
                </p>
                <p>
                  <span className="font-semibold text-indigo-600">
                    Past:
                  </span>{" "}
                  {student.pastQualification}
                </p>
              </>
            )}
          </div>

          {/* Family */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-indigo-600">
              <Home size={18} /> Family Details
            </h3>

            {isEditing ? (
              <>
                <input
                  type="text"
                  name="father"
                  value={student.father}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full mb-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <input
                  type="text"
                  name="mother"
                  value={student.mother}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </>
            ) : (
              <>
                <p>
                  <span className="font-semibold text-indigo-600">
                    Father:
                  </span>{" "}
                  {student.father}
                </p>
                <p>
                  <span className="font-semibold text-indigo-600">
                    Mother:
                  </span>{" "}
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