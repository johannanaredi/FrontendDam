
import MegaExportMissingButton from "./MegaExportMissingButton";
import DeleteById from "./DeleteById";
import MysqlAssets from "./MysqlAssets"
console.log("Imported MysqlAssets:", MysqlAssets);

function AdminPage({ username, password, onLogout }) {
  return (
    <div>
      <h2>Hej admin!</h2>
       <MysqlAssets username={username} password={password} />
        <MegaExportMissingButton username={username} password={password} />
        <DeleteById username={username} password={password} />
      <button onClick={onLogout}>Logga ut</button>
    </div>
  );
}

export default AdminPage;
