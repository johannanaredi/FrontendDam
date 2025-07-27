import { useEffect, useState } from "react";

function MegaFiles() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/mega/files")
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
  }, []);

  return (
    <div>
      <h2>Filer från Mega</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
}

export default MegaFiles;
