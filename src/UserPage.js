import MegaFiles from "./MegaFiles";

function UserPage({ username, password, onLogout }) {
  return (
    <div>
      <h2>Hej användare!</h2>
      <MegaFiles username={username} password={password} />
      <button onClick={onLogout}>Logga ut</button>
    </div>
  );
}

export default UserPage;
