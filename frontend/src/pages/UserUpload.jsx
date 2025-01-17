import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function UserUpload() {
    const { isLoggedIn, isAdmin } = useAuth();
    const [userId, setUserId] = useState(null);
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [socialMediaHandle, setSocialMediaHandle] = useState("");
    const [isUploading, setIsUploading] = useState(false); // State for upload status
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        } else if (isAdmin) {
            navigate("/admin-dashboard");
        } else {
            const id = sessionStorage.getItem("user_id");
            setUserId(id);
        }
    }, [isLoggedIn, isAdmin, navigate]);

    const handleImageChange = (e) => {
        setImage(e.target.files); // Handle multiple files
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image || image.length === 0) {
            toast.error("Please select at least one image.");
            return;
        }

        setIsUploading(true); // Start uploading
        const formData = new FormData();
        Array.from(image).forEach((img) => formData.append("images", img)); // Append each image to FormData
        formData.append("userId", userId);
        formData.append("fullName", name);
        formData.append("socialMediaHandle", socialMediaHandle);

        try {
            await axios.post(`${BASE_URL}/app/user-upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Images uploaded successfully!");
            resetForm(); // Clear form fields after successful upload
        } catch (error) {
            console.error("Error uploading images:", error);
            toast.error("Failed to upload images.");
        } finally {
            setIsUploading(false); // Stop uploading
        }
    };

    const resetForm = () => {
        setImage(null);
        setName("");
        setSocialMediaHandle("");
        document.querySelector("form").reset(); // Clear file input
    };

    return (
        <div className="container my-5">
            <div className="card shadow-lg border-0">
                <div className="card-body">
                    <h3 className="text-center text-primary mb-4">Upload an Image</h3>

                    {/* Show uploading status */}
                    {isUploading && <div className="text-center text-info mb-4">Uploading, please wait...</div>}

                    <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "800px" }}>
                        <div className="form-group mb-4">
                            <label className="form-label text-secondary">Name:</label>
                            <input
                                type="text"
                                className="form-control p-3"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label className="form-label text-secondary">Social Media Handle:</label>
                            <input
                                type="text"
                                className="form-control p-3"
                                value={socialMediaHandle}
                                onChange={(e) => setSocialMediaHandle(e.target.value)}
                                placeholder="Enter your social media handle"
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label className="form-label text-secondary">Upload Image:</label>
                            <input
                                type="file"
                                className="form-control p-3"
                                multiple
                                onChange={handleImageChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block py-3"
                            style={{ transition: "0.3s", backgroundColor: "#007bff" }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
                            disabled={isUploading} // Disable button while uploading
                        >
                            {isUploading ? "Uploading..." : "Upload"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserUpload;
