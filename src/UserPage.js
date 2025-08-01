import NailpolishListUser from "./NailpolishListUser";
import "./Logout.css";

function UserPage({ username, password, onLogout }) {
  return (
    <div>
      <h2>Hej användare!</h2>
       <NailpolishListUser username={username} password={password} />
      <button className="logout-button" onClick={onLogout}>Logga ut</button>
    </div>
  );
}

export default UserPage;
