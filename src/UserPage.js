import MegaFiles from "./MegaFiles";
import MegaExportAll from "./MegaExportAll";

function UserPage({ username, password, onLogout }) {
  return (
    <div>
      <h2>Hej användare!</h2>
      <MegaExportAll username={username} password={password} />
      <MegaFiles username={username} password={password} />
      <button onClick={onLogout}>Logga ut</button>
    </div>
  );
}

export default UserPage;
