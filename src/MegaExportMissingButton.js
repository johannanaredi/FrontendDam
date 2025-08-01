import React, { useState } from "react";
import "./MegaExportMissingButton.css";

const MegaExportMissingButton = ({ username, password }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleExport = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("http://localhost:8080/mega/export/missing", {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password),
        },
      });

      if (!response.ok) {
        throw new Error(`Fel vid export. Testa att logga ut och in igen för att se om filerna kommit ${response.statusText}`);
      }

      setStatus("Export lyckades!");
    } catch (err) {
      setStatus(`Fel: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
       <div className="export-container">
      <button className="export-button" onClick={handleExport} disabled={loading}>
        {loading ? "Exporterar..." : "Exportera nya filer från databasen"}
      </button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default MegaExportMissingButton;
