import React, { useEffect, useRef, useState } from "react";
import "./Alarm.css";

function Alarm({ isDark }) {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [m, setM] = useState("AM");
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const intervalRef = useRef(null);

  const checkAlarm = () => {
    const now = new Date();
    let currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const alarmHour = m === "PM" && hour < 12 ? parseInt(hour) + 12 : parseInt(hour);
    if (m === "AM" && hour === 12) currentHour -= 12;

    if (alarmHour === currentHour && parseInt(min) === currentMinute) {
      alert("Alarm is ringing...");
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsAlarmSet(false);
    }
  };

  const startAlarmCheck = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      checkAlarm();
    }, 1000);
  };

  useEffect(() => {
    if (isAlarmSet) {
      startAlarmCheck();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAlarmSet]);

  return (
    <div
      style={isDark ? { backgroundColor: "#2e2e2e", color: "#fff" } : null}
      className="alarm-container"
    >
      <h1>Alarm</h1>
      <div className="input-field">
        <div className="input-alarm">
          <select onChange={(e) => setHour(parseInt(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {String(i + 1).padStart(2, "0")}
              </option>
            ))}
          </select>
          <select onChange={(e) => setMin(parseInt(e.target.value))}>
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i}>
                {String(i).padStart(2, "0")}
              </option>
            ))}
          </select>
          <select onChange={(e) => setM(e.target.value)}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
      <button
        onClick={() => setIsAlarmSet(true)}
        style={
          isDark
            ? { backgroundColor: "#fff", color: "black" }
            : { backgroundColor: "black", color: "#fff" }
        }
      >
        Set Alarm
      </button>
      {isAlarmSet && (
        <p>
          Alarm is set for {hour}:{String(min).padStart(2, "0")} {m}
        </p>
      )}
    </div>
  );
}

export default Alarm;
