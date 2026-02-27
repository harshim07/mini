import { useEffect, useState } from "react";
import API from "../api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/data").then((res) => setData(res.data));
  }, []);

  const attackCount = data.filter((d) => d.attack === 1).length;
  const normalCount = data.length - attackCount;

  const chartData = {
    labels: ["Normal", "Attack"],
    datasets: [
      {
        label: "Traffic Distribution",
        data: [normalCount, attackCount],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  return (
    <div className="card">
      <h2>📊 Traffic Overview</h2>
      <p>Total Records: {data.length}</p>
      <Bar data={chartData} />
    </div>
  );
}

export default Dashboard;
