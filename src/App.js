
import { useState } from "react";
import MegaFiles from './MegaFiles';
import './App.css';

function App() {

  const[username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {

    fetch("http://localhost:8080/mega/user", {
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
    })
    .then((res) => {
      if(res.ok){
        setIsLoggedIn(true);
      }else {
        alert("Fel användarnamn eller lösenord");
      }

    })
    .catch(() => alert("Något gick fel vid inloggningen"));
  };

 return (
    <div className="App">
      <h1>Mega File Viewer</h1>
      {!isLoggedIn ? (
        <div>
          <input
            type="text"
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Logga in</button>
        </div>
      ) : (
        <MegaFiles username={username} password={password} />
      )}
    </div>
  );
}

export default App;
