import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";

function AppContent() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogout = () => {
    setCredentials({ username: "", password: "" });
    navigate("/"); 
  };

  return (
    <Routes>
      <Route path="/" element={<LoginPage setCredentials={setCredentials} />} />
      <Route path="/user" element={<UserPage {...credentials} onLogout={handleLogout} />} />
      <Route path="/admin" element={<AdminPage {...credentials} onLogout={handleLogout} />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
