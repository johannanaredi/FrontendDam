import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage({ setCredentials }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const headers = {
      Authorization: "Basic " + btoa(`${username}:${password}`),
    };

    fetch("http://localhost:8080/mega/admin", { headers })
      .then((res) => {
        if (res.ok) {
          setCredentials({ username, password });
          navigate("/admin");
        } else {
          return fetch("http://localhost:8080/mega/user", { headers }).then((res2) => {
            if (res2.ok) {
              setCredentials({ username, password });
              navigate("/user");
            } else {
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
