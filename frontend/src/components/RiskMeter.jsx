import React from "react";
import "./RiskMeter.css";

function RiskMeter({ risk }) {
  return (
    <div className="risk-container">
      <div className="risk-bar" style={{ width: `${risk}%` }}>
        {risk}%
      </div>
    </div>
  );
}

export default RiskMeter;
