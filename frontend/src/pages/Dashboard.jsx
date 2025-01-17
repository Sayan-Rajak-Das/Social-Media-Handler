import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin-dashboard");
    }
  }, [isAdmin, navigate]);

  return (
    <div>
      <h1>"User Dashboard"</h1>
    </div>
  );
};

export default Dashboard;
