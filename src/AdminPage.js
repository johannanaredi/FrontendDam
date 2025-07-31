import MegaFiles from "./MegaFiles";

function AdminPage({ username, password, onLogout }) {
  return (
    <div>
      <h2>Hej admin!</h2>
      <MegaFiles username={username} password={password} />
      <button onClick={onLogout}>Logga ut</button>
    </div>
  );
}

export default AdminPage;
