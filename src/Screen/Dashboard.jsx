import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import useWebSocket from "../hooks/useWebSocket";  
import "./../styles/Dashboard.css";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const navigate = useNavigate();
  
  // WebSocket URL 
  const socketUrl = "ws://localhost:8080";  
  const sensorData = useWebSocket(socketUrl); 
  
  const [temperatureData, setTemperatureData] = useState({
    labels: ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"],
    datasets: [
      {
        label: "Water Temperature (°C)",
        data: [22, 23, 25, 26, 27, 28, 29],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        tension: 0.3,
      },
    ],
  });

  useEffect(() => {
    if (sensorData) {
      setTemperatureData((prevData) => {
        const newTemp = sensorData.temperature; 
        const newLabels = [...prevData.labels, new Date().toLocaleTimeString().slice(0, 5)];
        const newData = [...prevData.datasets[0].data, newTemp];

        return {
          labels: newLabels.slice(-7), 
          datasets: [{ ...prevData.datasets[0], data: newData.slice(-7) }],
        };
      });
    }
  }, [sensorData]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">
          <img src="/b.png" alt="Water Temp. Corp." />
          <h2>WATER TEMP. CORP.</h2>
        </div>
        <div className="user-info">
          <img src="/c.png" alt="User" />
          <p>Cuarteros GWAPO JUD KAAYO</p>
          <span>@admin</span>
        </div>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Records</li>
            <li>Device Reading</li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          LOG OUT
        </button>
      </aside>

      <main className="main-content">
        <h2>PAST READING</h2>
        <p>FEBRUARY 1, 2025 | 10:23 AM</p>
        <div className="data-display">
          <div className="humidity">
            <img src="/e.png" alt="Humidity" />
            <p>HUMIDITY <br /> <strong>62.2%</strong></p>
          </div>
          <div className="temperature">
            <img src="/d.png" alt="Temperature" />
            <p>TEMPERATURE <br /> <strong>{sensorData?.temperature || "Loading..."}</strong></p>
          </div>
        </div>

        {/* Temperature Chart */}
        <div className="chart">
          <h3>Water Temperature Graph</h3>
          <Line data={temperatureData} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
