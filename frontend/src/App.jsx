import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';  
import Footer from './components/Footer';
import './style.css';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/AdminDashboard';
import UserPage from './pages/UserData';
import UserUpload from './pages/UserUpload';  

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/user-upload" element={<UserUpload />} />  
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
