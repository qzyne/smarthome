import React, { useState } from 'react';
import '../css/ToggleButton.css'; // Import CSS cho toggle button

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false); // Trạng thái bật/tắt

  const handleToggle = () => {
    setIsOn(prevState => !prevState); // Đảo ngược trạng thái bật/tắt
  };

  return (
    <button 
      className={`toggle-button ${isOn ? 'on' : 'off'}`} 
      onClick={handleToggle}
    >
      <div className={`toggle-circle ${isOn ? 'on' : 'off'}`}></div>
      <span className={`toggle-text body3-regular ${isOn ? 'on' : 'off'}`}>
        {isOn ? 'ON' : 'OFF'}
      </span>
    </button>
  );
};

export default ToggleButton;