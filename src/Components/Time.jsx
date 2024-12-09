import React, { useState } from "react";
import "./Time.css";

function Time({ isDark }) {
  const [showTime, setShowTime] = useState("");
  const [date, setDate] = useState("");
  setInterval(() => {
    const time = new Date();
    setShowTime(time.toLocaleTimeString());
    setDate(time.toLocaleDateString());
  }, 1000);
  return (
    <div
      style={isDark ? { backgroundColor: "#2e2e2e" } : null}
      className="time-container"
    >
      <h2>Clock</h2>
      <div className="showTime">
        <h1>{showTime}</h1>
        <p>Date : {date}</p>
      </div>
    </div>
  );
}

export default Time;
