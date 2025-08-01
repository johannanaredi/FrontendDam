import { useEffect, useState } from "react";

function MegaFiles({ username, password }) {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/mega/files", {
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Något gick fel!");
        return res.json();
      })
      .then((data) => {
        setFiles(data);
      })
      .catch((err) => {
        console.error("Fel vid hämtning:", err);
      });
  }, [username, password]);

  const filteredFiles = files.filter((file) =>
    file.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Filer från Mega</h2>
      
      <input
        type="text"
        placeholder="Sök efter filnamn"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "200px" }}
      />
      
      <ul>
        {filteredFiles.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
}

export default MegaFiles;
