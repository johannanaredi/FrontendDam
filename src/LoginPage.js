import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate från react-router-dom för sidnavigering
import "./LoginPage.css";

// LoginPage-komponenten tar emot setCredentials som props
function LoginPage({ setCredentials }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

   // När användaren klickar på "Logga in"-knappen
  const handleLogin = () => {
    // Skapar headers med Basic Auth
    const headers = {
      Authorization: "Basic " + btoa(`${username}:${password}`),
    };

    fetch("http://localhost:8080/mega/admin", { headers })
      .then((res) => {
        // Om svaret är OK (200), spara credentials och navigera till admin-sidan
        if (res.ok) {
          setCredentials({ username, password });
          navigate("/admin");
        } else {
           // Om admin-login misslyckas, prova istället som vanlig användare
          return fetch("http://localhost:8080/mega/user", { headers }).then((res2) => {
            if (res2.ok) {
               // Om vanlig användare lyckas logga in, spara credentials och navigera till användarsidan
              setCredentials({ username, password });
              navigate("/user");
            } else {
              // Om båda misslyckas, visa felmeddelande
              alert("Fel användarnamn eller lösenord");
            }
          });
        }
      })
      .catch(() => alert("Något gick fel vid inloggning"));
  };

  return (
    <div className="login-container">
      <div className="login-box">
      <h2>Logga in</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Användarnamn" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Lösenord" />
      <button onClick={handleLogin}>Logga in</button>
    </div>
    </div>
  );
}

export default LoginPage;
