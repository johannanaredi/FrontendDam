import { useEffect, useState } from "react";
import "./NailpolishListUser.css";

function NailpolishListUser({ username, password }) {
  const [nailpolishes, setNailpolishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editNailpolish, setEditNailpolish] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/mega/nailpolish", {
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Något gick fel!");
        return res.json();
      })
      .then((data) => {
        setNailpolishes(data);
      })
      .catch((err) => {
        console.error("Fel vid hämtning:", err);
      });
  }, [username, password]);

  const filtered = nailpolishes.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
// När man klickar på en rad sätts den i redigeringsläge och skapar en kopia av objektet för ändringar.
  const startEdit = (index) => {
    setEditIndex(index);
    setEditNailpolish({ ...filtered[index] });
  };

  // Uppdaterar editNailpolish när ett inputfält ändras
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditNailpolish((prev) => ({ ...prev, [name]: value })); // Kopierar datan till redigeringsobjektet
  };

  // Sparar ändrade värden till backend
  const saveEdit = () => {
    fetch(`http://localhost:8080/mega/nailpolish/${editNailpolish.name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
      body: JSON.stringify(editNailpolish),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fel vid sparande");
        return res.json();
      })
      .then((updatedNail) => {
        const newNailpolishes = [...nailpolishes];
        const globalIndex = nailpolishes.findIndex(
          (n) => n.name === updatedNail.name
        );
        if (globalIndex >= 0) {
          newNailpolishes[globalIndex] = updatedNail;
          setNailpolishes(newNailpolishes);
        }
        setEditIndex(null);
        setEditNailpolish(null);
      })
      .catch((err) => {
        console.error(err);
        alert("Något gick fel vid sparandet");
      });
  };

  return (
    <div className="container">
      <h2>Nagellack info till allmänheten</h2>

      <input
        type="text"
        placeholder="Sök på namn"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "200px" }}
      />

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Namn</th>
            <th>Märke</th>
            <th>Finish</th>
            <th>Färg</th>
            <th>Storlek (ml)</th>
            <th>Täckning</th>
            <th>Åtgärd</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((nail, index) => (
            <tr
              key={index}
              onClick={() => startEdit(index)}
              style={{ cursor: "pointer" }}
            >
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="name"
                    value={editNailpolish.name}
                    disabled
                  />
                ) : (
                  nail.name
                )}
              </td>

              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="brand"
                    value={editNailpolish.brand || ""}
                    onChange={handleChange}
                  />
                ) : (
                  nail.brand
                )}
              </td>

              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="finish"
                    value={editNailpolish.finish || ""}
                    onChange={handleChange}
                  />
                ) : (
                  nail.finish
                )}
              </td>

              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="color"
                    value={editNailpolish.color || ""}
                    onChange={handleChange}
                  />
                ) : (
                  nail.color
                )}
              </td>

              <td>
                {editIndex === index ? (
                  <input
                    type="number"
                    name="sizeMl"
                    value={editNailpolish.sizeMl || ""}
                    onChange={handleChange}
                  />
                ) : (
                  nail.sizeMl
                )}
              </td>

              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="coverage"
                    value={editNailpolish.coverage || ""}
                    onChange={handleChange}
                  />
                ) : (
                  nail.coverage
                )}
              </td>

              <td>
                {editIndex === index && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        saveEdit();
                      }}
                      style={{ marginRight: "5px" }}
                    >
                      Spara
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditIndex(null);
                        setEditNailpolish(null);
                      }}
                    >
                      Avbryt
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NailpolishListUser;
