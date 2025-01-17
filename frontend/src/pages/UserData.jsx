import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useAuth(); // Assuming useAuth provides this context
  const [user, setUser] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect if not logged in
      return;
    }
    if (!isAdmin) {
      navigate('/user-upload'); // Redirect if not an admin
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/app/users/${id}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        toast.error("Error fetching user data.");
      }
    };

    fetchUserData();
  }, [id, isLoggedIn, isAdmin, navigate]);

  const handleAdminToggle = async () => {
    try {
      await fetch(`${BASE_URL}/app/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admin: !user.admin }),
      });
      toast.success("Admin status updated.");
      setUser({ ...user, admin: !user.admin });
    } catch (error) {
      toast.error("Error updating admin status.");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3> Last Uploaded Image </h3>
          <img
             src={user.images && user.images.length > 0 ? user.images.at(-1).url : "image.jpg"}
            alt={user.fullName}
            className="img-fluid"
            style={{ objectFit: 'contain', height: '300px' }} // Fit image within its container
          />
        </div>
        <div className="col-md-8">
          <h2>{user.fullName}'s Profile</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Social Media handle:</strong> {user.socialMediaHandle}</p>
          <p><strong>Admin Status:</strong> {user.admin ? "Yes" : "No"}</p>
          <button
            className="btn btn-warning mb-3"
            onClick={handleAdminToggle}
          >
            {user.admin ? "Revoke Admin" : "Make Admin"}
          </button>
          <div>
            <h4>Uploaded Images</h4>
            <div className="d-flex flex-wrap justify-content-start">
              {user.images && user.images.length > 0 ? (
                user.images.map((image, index) => (
                  <a href={image.url} target="_blank" rel="noopener noreferrer" key={index}>
                    <div className="col-4 mb-3">
                      <img
                        src={image.url}
                        alt="User uploaded"
                        className="img-fluid"
                        style={{ height: "150px", objectFit: "contain" }} // Fit image within container
                      />
                    </div>
                  </a>
                ))
              ) : (
                <p>No images uploaded.</p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <h5>Additional Details:</h5>
            <p><strong>Joined on:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
