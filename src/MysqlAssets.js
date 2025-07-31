import { useEffect, useState } from "react";

function MysqlAssets({ username, password }) {
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/mega/assets", {
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`)
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Kunde inte hämta asset-data");
        return res.json();
      })
      .then(data => setAssets(data))
      .catch(err => setError(err.message));
  }, [username, password]);

  return (
    <div>
      <h3>MySQL Assets</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {assets.map(asset => (
          <li key={asset.id}>
            <strong>{asset.filename}</strong><br />
            URL: {asset.megaUrl}<br />
            Typ: {asset.fileType}<br />
            Uppladdad: {asset.uploadedAt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MysqlAssets;
