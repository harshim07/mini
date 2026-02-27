import React, { useState } from "react";
import { generateLog } from "../api";
import RiskMeter from "../components/RiskMeter";
import "../Dashboard.css";

function AdminDashboard() {
  const [data, setData] = useState(null);

  const handleGenerate = async () => {
    const res = await generateLog();
    setData(res);
  };

  return (
    <div className="dashboard container">
      <header className="topbar">
        <div>
          <h1 className="title">CyberShield</h1>
          <p className="subtitle">AI-Powered Security & Monitoring</p>
        </div>
        <nav className="nav">
          <a className="nav-link">Home</a>
          <a className="nav-link">Detection</a>
          <a className="nav-link">Monitoring</a>
          <a className="nav-link">Reporting</a>
          <a className="nav-link active">Admin</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-left">
          <h2>Advanced threat detection and real-time monitoring</h2>
          <p className="hero-desc">
            AI-driven insights, automated responses, and comprehensive
            reporting.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={handleGenerate}>
              Start Detection
            </button>
            <button className="btn-ghost">View Dashboard</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="stat-grid">
            <div className="stat card-stat">
              <div className="stat-value">+12%</div>
              <div className="stat-label">Total Networks Monitored</div>
              <div className="stat-number">24</div>
            </div>

            <div className="stat card-stat">
              <div className="stat-value">+23%</div>
              <div className="stat-label">Active Threats Detected</div>
              <div className="stat-number">3</div>
            </div>

            <div className="stat card-stat">
              <div className="stat-value">+2%</div>
              <div className="stat-label">Security Score</div>
              <div className="stat-number">94%</div>
            </div>

            <div className="stat card-stat">
              <div className="stat-value">+8%</div>
              <div className="stat-label">Users Protected</div>
              <div className="stat-number">1,247</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <h3>Powerful Features</h3>
        <p className="muted">
          Comprehensive security solutions for modern threats
        </p>
        <div className="features-grid">
          <div className="feature card">
            <h4>Real-Time Detection</h4>
            <p>
              Advanced AI-powered threat detection system that monitors network
              traffic in real-time.
            </p>
          </div>
          <div className="feature card">
            <h4>Monitoring Dashboard</h4>
            <p>
              Comprehensive analytics and visualization of security metrics with
              interactive charts.
            </p>
          </div>
          <div className="feature card">
            <h4>Security Reports</h4>
            <p>
              Detailed incident reports and analysis for compliance and forensic
              investigations.
            </p>
          </div>
          <div className="feature card">
            <h4>Database Management</h4>
            <p>
              Centralized threat intelligence storage with encrypted storage.
            </p>
          </div>
        </div>
      </section>

      <section className="activity">
        <div className="activity-left">
          <h3>Recent Security Activity</h3>
          <button className="link-btn">View All Activity</button>

          <ul className="activity-list">
            <li className="activity-item success">
              <div className="time">2 min ago</div>
              <div className="message">
                System scan completed successfully — All systems operational
              </div>
            </li>
            <li className="activity-item danger">
              <div className="time">15 min ago</div>
              <div className="message">
                Suspicious activity detected from IP 192.168.1.105 — Threat
                neutralized automatically
              </div>
            </li>
            <li className="activity-item warning">
              <div className="time">1 hour ago</div>
              <div className="message">
                Security definitions updated — Latest threat patterns added
              </div>
            </li>
            <li className="activity-item info">
              <div className="time">2 hours ago</div>
              <div className="message">
                Firewall rules optimized — Performance improved by 15%
              </div>
            </li>
          </ul>
        </div>

        <div className="activity-right">
          <h3>Live Risk</h3>
          <div className="risk-card card">
            <RiskMeter risk={data ? data.risk : 42} />
            <div className="risk-meta">
              Current risk score based on active detections
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
