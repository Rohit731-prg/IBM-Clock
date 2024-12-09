import React, { useState, useRef } from 'react';
import './Timmer.css';

function Timmer({isDark}) {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [hour, setHour] = useState(0);
  const [milli, setMilli] = useState(0);

  const intervalRef = useRef(null);
  const start = ({isDark}) => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setMilli((prevMilli) => {
        if (prevMilli === 90) {
          setSec((prevSec) => {
            if (prevSec === 59) {
              setMin((prevMin) => {
                if (prevMin === 59) {
                  setHour((prevHour) => prevHour + 1);
                  return 0;
                }
                return prevMin + 1;
              });
              return 0;
            }
            return prevSec + 1;
          });
          return 0;
        }
        return prevMilli + 10;
      });
    }, 100);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setMin(0);
    setSec(0);
    setHour(0);
    setMilli(0);
  };

  return (
    <div style={isDark ? {backgroundColor : '#2e2e2e'} : null} className='timmer-container'>
      <h3>Stop Watch</h3>
      <div className="content">
        <h4>
          {hour > 9 ? hour : `0${hour}`} : {min > 9 ? min : `0${min}`} : {sec > 9 ? sec : `0${sec}`} : 
          <span className='milli'>{milli > 9 ? milli : `0${milli}`}</span>
        </h4>
        <div className="btns">
          <button style={isDark ? {backgroundColor : '#fff', color : 'black'} : {backgroundColor : 'black', color : '#fff'}} onClick={start}>Start</button>
          <button style={isDark ? {backgroundColor : '#fff', color : 'black'} : {backgroundColor : 'black', color : '#fff'}} onClick={stop}>Stop</button>
          <button style={isDark ? {backgroundColor : '#fff', color : 'black'} : {backgroundColor : 'black', color : '#fff'}} onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default Timmer;
