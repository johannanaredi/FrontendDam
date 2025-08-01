import { useEffect, useState } from "react";

function MegaExportAll({ username, password }) {
  const [exportData, setExportData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/mega/export/all", {
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Kunde inte hämta data-exporten");
        return res.json();
      })
      .then((data) => setExportData(data))
      .catch((err) => setError(err.message));
  }, [username, password]);

  return (
    <div>
      <h3>Exporterade tillgångar</h3>
      {error && <p>{error}</p>}
      <ul>
        {exportData.map((item, index) => (
          <li key={index}>
            {item.filename} —{" "}
            <a href={item.megaUrl} target="_blank" rel="noreferrer">
              Länk
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MegaExportAll;
