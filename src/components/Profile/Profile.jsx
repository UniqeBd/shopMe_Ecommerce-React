import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }
    setUserData(user);
    setEditedData(user);
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(userData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // In a real application, you would send this data to your backend
    localStorage.setItem("user", JSON.stringify(editedData));
    setUserData(editedData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-600 font-medium">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedData.name || ""}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
            ) : (
              <p className="text-gray-800">{userData.name}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-600 font-medium">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedData.email || ""}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
            ) : (
              <p className="text-gray-800">{userData.email}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-600 font-medium">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={editedData.phone || ""}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
            ) : (
              <p className="text-gray-800">{userData.phone}</p>
            )}
          </div>
          <div className="flex justify-center space-x-4 mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
