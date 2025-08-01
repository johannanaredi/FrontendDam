import { useState } from "react";
import "./DeleteById.css";

function DeleteById({ username, password }) {
  const [assetId, setAssetId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = () => {
    fetch(`http://localhost:8080/mega/assets/${assetId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Borttagning misslyckades.");
        }
        return res.text();
      })
      .then((text) => {
        setMessage(text);
        setAssetId("");
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

 return (
  <div className="delete-by-id">
    <h2>Ta bort asset med ID</h2>
    <input
      type="number"
      placeholder="Asset ID"
      value={assetId}
      onChange={(e) => setAssetId(e.target.value)}
    />
    <button onClick={handleDelete}>Ta bort</button>
    {message && <p>{message}</p>}
  </div>
);

}

export default DeleteById;
