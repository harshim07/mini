import { useState } from "react";
import API from "../api";

function DetectionForm() {
  const [form, setForm] = useState({
    packet_size: 500,
    duration: 2,
    failed_logins: 0,
    connections: 10,
    data_transferred: 100,
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async () => {
    const response = await API.post("/detect", form);
    setResult(response.data.attack);
  };

  return (
    <div className="card">
      <h2>🔍 Real-Time Detection</h2>

      {Object.keys(form).map((key) => (
        <div key={key} style={{ marginBottom: "10px" }}>
          <label>{key}</label>
          <input
            type="number"
            name={key}
            value={form[key]}
            onChange={handleChange}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
      ))}

      <button onClick={handleSubmit}>Analyze Traffic</button>

      {result !== null && (
        <p className={result === 1 ? "danger" : "success"}>
          {result === 1 ? "Attack Detected 🚨" : "Normal Traffic ✅"}
        </p>
      )}
    </div>
  );
}

export default DetectionForm;
