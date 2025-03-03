import React, { useState } from "react";
import "../css/ToggleButton.css"; // Import CSS cho toggle button

const ToggleButton = ({ isOn, onToggle }) => {
  // const [isOn, setIsOn] = useState(false); // Trạng thái bật/tắt

  // const onToggle = () => {
  //   setIsOn(prevState => !prevState); // Đảo ngược trạng thái bật/tắt
  // };
  return (
    <button
      className={`toggle-button ${isOn ? "on" : "off"}`}
      onClick={onToggle}
    >
      <div className={`toggle-circle ${isOn ? "on" : "off"}`}></div>
      <span className={`toggle-text body3-regular ${isOn ? "on" : "off"}`}>
        {isOn ? "ON" : "OFF"}
      </span>
    </button>
  );
};

export default ToggleButton;
