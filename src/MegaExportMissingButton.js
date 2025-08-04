import React, { useState } from "react";
import "./MegaExportMissingButton.css";

const MegaExportMissingButton = ({ username, password }) => {
  const [status, setStatus] = useState(null); // State för statusmeddelande ("Export lyckades" eller fel)
  const [loading, setLoading] = useState(false);  // State för att visa om exporten pågår


  const handleExport = async () => {
    setLoading(true); // Sätter loading till true för att visa att något pågår
    setStatus(null); // Rensar tidigare statusmeddelande

    try {
      const response = await fetch("http://localhost:8080/mega/export/missing", {
        method: "GET",
        headers: {
          // Basic Auth, användarnamn + lösenord skickats in som props
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
      // Avsluta laddningsstatus oavsett resultat
      setLoading(false);
    }
  };

  return (
       <div className="export-container">
      <button className="export-button" onClick={handleExport} disabled={loading}>
        {/* Byter text beroende på om loading är true eller false */}
        {loading ? "Exporterar..." : "Exportera nya filer från databasen"}
      </button>
      {/* Om ett statusmeddelande finns, visa */}
      {status && <p>{status}</p>}
    </div>
  );
};

export default MegaExportMissingButton;
