import { useEffect, useState } from "react";
import API from "../api";

function Report() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    API.get("/report").then((res) => setReport(res.data));
  }, []);

  return (
    <div className="card">
      <h2>📑 Security Report</h2>
      {report && (
        <table>
          <thead>
            <tr>
              <th>Total Records</th>
              <th>Total Attacks</th>
              <th>Normal Traffic</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{report.total_records}</td>
              <td>{report.total_attacks}</td>
              <td>{report.normal_traffic}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Report;
