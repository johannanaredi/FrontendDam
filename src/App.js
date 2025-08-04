import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";

// Innehållet i appen, routing och inloggningshantering. 
function AppContent() {
  const [credentials, setCredentials] = useState({ username: "", password: "" }); // Props som skickas in i barnkomponenterna
  const navigate = useNavigate(); // // Hook för att kunna navigera 

  const handleLogout = () => {
    setCredentials({ username: "", password: "" });
    navigate("/"); 
  };

  return (
    <Routes>
      <Route path="/" element={<LoginPage setCredentials={setCredentials} />} />
      <Route path="/user" element={<UserPage {...credentials} // Spread-operator: skickar username och password som olika props
      onLogout={handleLogout} />} /> 
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
