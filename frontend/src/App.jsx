import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import DetectionPage from './pages/DetectionPage';
import MonitoringPage from './pages/MonitoringPage';
import ReportingPage from './pages/ReportingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cyber-dark">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/detection" element={<DetectionPage />} />
            <Route path="/monitoring" element={<MonitoringPage />} />
            <Route path="/reporting" element={<ReportingPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
