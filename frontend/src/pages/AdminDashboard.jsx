import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useAuth(); 
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (!isAdmin) {
      navigate("/user-upload");
    } else {
      fetchUsers();
    }
  }, [isLoggedIn, isAdmin, navigate]);  

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/app/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users.");
    }
  };

  const handleAdminToggle = async (id, currentStatus) => {
    try {
      await fetch(`${BASE_URL}/app/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin: !currentStatus }),
      });
      toast.success("Admin status updated.");
      fetchUsers();
    } catch (error) {
      console.error("Error updating admin status:", error);
      toast.error("Failed to update admin status.");
    }
  };

  const handleViewUserDetails = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <div className="container p-4">
      <h3>All Users</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4">No users found.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.admin ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleAdminToggle(user._id, user.admin)}
                  >
                    {user.admin ? "Revoke Admin" : "Make Admin"}
                  </button>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleViewUserDetails(user._id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
