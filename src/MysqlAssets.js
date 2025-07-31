import { useEffect, useState } from "react";

function MysqlAssets({ username, password }) {
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filtrera listan baserat på söktermen
  const filteredAssets = assets.filter(asset =>
    asset.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>MySQL Assets</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Sökfält */}
      <input
        type="text"
        placeholder="Sök på filnamn..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      />

      <ul>
        {filteredAssets.map(asset => (
          <li key={asset.id}>
            <strong>{asset.filename}</strong><br />
            URL: <a href={asset.megaUrl} target="_blank" rel="noreferrer">{asset.megaUrl}</a><br />
            Typ: {asset.fileType}<br />
            Uppladdad: {asset.uploadedAt}
          </li>
        ))}
      </ul>

      {filteredAssets.length === 0 && <p>Inga matchande filer.</p>}
    </div>
  );
}

export default MysqlAssets;
