import NailpolishListUser from "./NailpolishListUser";

function UserPage({ username, password, onLogout }) {
  return (
    <div>
      <h2>Hej användare!</h2>
       <NailpolishListUser username={username} password={password} />
      <button onClick={onLogout}>Logga ut</button>
    </div>
  );
}

export default UserPage;
