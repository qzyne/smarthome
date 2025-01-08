import '../css/Tempurature.css'; 
import React, { useState, useEffect } from 'react';
import { Sun } from 'phosphor-react';
import ToggleButton from '../components/ToggleButton';

const Tempurature = () => {
    const [device, setDevice] = useState({
        id: 1, // Giả định ID của thiết bị
        status: false, // Trạng thái ban đầu của máy bơm
      });
      
    const humidity = 55;
    const tempurature = 31;
    const handleToggleStatus = (id) => {
        if (id === device.id) {
          setDevice((prevDevice) => ({
            ...prevDevice,
            status: !prevDevice.status,
          }));
        }
      };
      
  return (
    <div className='tempurature'>
        <div className='h2-bold title'>Phòng Ngủ</div>
        <div className='temp'>
            <div className='content'>
                <div className='body1-bold t1'>Nhiệt độ</div>
                <div className='t2'>{tempurature}</div>
                <div><Sun className='sun-icon' size='1.5em'/></div>
            </div>
        </div>
        <div className='content-container'>
            <span className='humidity body1-bold'>Độ ẩm</span>
            <span className='percent h3-bold'>{humidity}%</span>
        </div>
     
            <div className='humidity-bar'>
                <div
                className="humidity-fill"
                style={{ width: `${humidity}%` }}
                >
                </div>
            </div>
            <div
                className="humidity-circle"
                style={{
                left: humidity >= 80 ? `calc(${humidity}% - 2em)` : `calc(${humidity}% - 1em)`,
                minWidth: '0px',
                maxWidth: 'calc(100% - 12.5px)'}}
            ></div>

        <div className='motor'>
            <span className='h3-bold'>Máy Lạnh</span>
            <ToggleButton
                isOn={device.status}
                onToggle={() => handleToggleStatus(device.id)}
            />
        </div>
    </div>
    
  );
};

export default Tempurature;