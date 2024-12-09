import React, { useState, useRef } from 'react';
import './App.css';
import Timmer from './Components/Timmer';
import Time from './Components/Time';
import Alarm from './Components/Alarm';

function App() {
    const [isDark, setIsDark] = useState(false);

    return (
        <div 
        className='App'
        style={isDark ? { backgroundColor: 'black', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>
            <button className='btn'
            style={isDark ? { backgroundColor: 'white', color: 'black' } : { backgroundColor: 'black', color: 'white' }}
            onClick={() => setIsDark(!isDark)}>{isDark ? 'Light' : 'Dark'}</button>
            <div className="time">
                <Time isDark={isDark}/>
            </div>
            <div className="addition">
                <Alarm  isDark={isDark}/>
                <Timmer isDark={isDark}/>
            </div>
        </div>
    );
}

export default App;
