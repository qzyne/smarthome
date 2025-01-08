import { Drop } from 'phosphor-react';
import React, { useState, useEffect } from 'react';
import ToggleButton from '../ToggleButton';
import SetWateringTime from './SetWateringTime'; // Import component

function GardenTime({ hour, minute }) {
  const [device, setDevice] = useState({
    id: 1, // Giả định ID của thiết bị
    status: false, // Trạng thái ban đầu của máy bơm
  });
  
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [percentageLeft, setPercentageLeft] = useState(calculatePercentageLeft());
  const [isWateringTime, setIsWateringTime] = useState(false); //Status tưới cây
  const [isWatering, setIsWatering] = useState(false); // Trạng thái tưới cây
  const [humidity, setHumidity] = useState(85); // Độ ẩm, có thể cập nhật từ API hoặc sensor
  const [wateringDuration, setWateringDuration] = useState(5); 

  const [wateringTime, setWateringTime] = useState({ hour: 6, minute: 0 }); // Set giờ tưới

  const handleTimeChange = (newHour, newMinute) => {
    setWateringTime({ hour: newHour, minute: newMinute });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      setPercentageLeft(calculatePercentageLeft());

      // Kiểm tra nếu đến thời gian tưới cây
      if (newTimeLeft.hours === 0 && newTimeLeft.minutes === 0) {
        setIsWateringTime(true);
        setIsWatering(true);
        // Sau 5 phút, dừng tưới cây và reset lại
        setTimeout(() => {
          setIsWatering(false);
          setIsWateringTime(false);
          setTimeLeft(calculateTimeLeft()); // Reset lại thời gian đếm ngược cho ngày tiếp theo
        }, 5 * 60 * 1000); // 5 phút tưới cây
      } else {
        setIsWateringTime(false);
      }
    }, 1000); // Cập nhật mỗi giây

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const now = new Date();
    const nextWateringTime = new Date(now);
    nextWateringTime.setHours(hour, minute, 0, 0);

    if (now.getHours() > hour || (now.getHours() === hour && now.getMinutes() >= minute)) {
      nextWateringTime.setDate(now.getDate() + 1); // Nếu giờ hiện tại đã qua, tính vào ngày mai
    }

    const difference = nextWateringTime - now;

    return {
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  function calculatePercentageLeft() {
    const totalDuration = 24 * 60 * 60 * 1000; // Tổng thời gian trong một ngày (24h)
    const currentTime = new Date();
    const targetTime = new Date();
    targetTime.setHours(hour, minute, 0, 0);

    if (currentTime.getHours() > hour || (currentTime.getHours() === hour && currentTime.getMinutes() >= minute)) {
      targetTime.setDate(currentTime.getDate() + 1); // Nếu giờ hiện tại đã qua, tính vào ngày mai
    }

    const remainingTime = targetTime - currentTime;
    return (remainingTime / totalDuration) * 100;
  }

  function getCircleColor(percentage) {
    if (percentage > 50) return '#CFE6F2';
    if (percentage > 20) return '#50B5EA';
    return 'red';
  }

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  function handleWateringDurationChange(event) {
    const value = event.target.value;
    if (value >= 1 && value <= 60) {
      setWateringDuration(Number(value)); // Chỉ cho phép giá trị từ 1 đến 60
    }
  }

  const handleToggleStatus = (id) => {
    if (id === device.id) {
      setDevice((prevDevice) => ({
        ...prevDevice,
        status: !prevDevice.status,
      }));
    }
  };
  
  return (
    <div className="gardenTime" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      flexDirection: 'column'
    }}>

      {/* Vòng tròn đồng hồ */}
      <div style={{ position: 'relative', width: '13.3125em', height: '13.3125em' }}>
        <svg width="13.3125em" height="13.3125em" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" stroke="#F3F3F3" strokeWidth="1.25em" fill="none" />
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke={getCircleColor(percentageLeft)}
            strokeWidth="1.25em"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 90}`}
            strokeDashoffset={2 * Math.PI * 90 * (1 - percentageLeft / 100)}
            transform="rotate(-90 100 100)"
          />
        </svg>

        {/* Text ở giữa vòng tròn */}
        <div style={{
          height: 'auto',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          {timeLeft.hours !== undefined && (
            <div>
              <div style={{fontSize: '1.125em', color:'var(--bold-brown)', fontWeight:'bold', paddingBottom:'0.75em'}}>{hour}:{minute}</div>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '2.8125em', color: 'var(--primary-color)', paddingBottom:'12px'}}>
                <span>{formatTime(timeLeft.hours)}</span>
                <span>:</span>
                <span>{formatTime(timeLeft.minutes)}</span>
              </div>
              <div>
                <Drop size={24} color="#2A9E8E" weight="bold" style={{ width: '100%' }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Thêm phần độ ẩm và thanh tiến độ */}
      <div className="content-container">
        <span className="body1-bold" style={{ color: 'var(--bold-brown)' }}>Độ ẩm</span>
        <span className="h3-bold">{humidity}%</span>
      </div>

      <div
        className="humidity-bar"
        style={{
          width: 'calc(100% - 2.5em)',
          backgroundColor: '#f0f0f0',
          height: '1.25em',
          borderRadius: '0.625em',
          margin: '1em',
          position: 'relative',
        }}
      >
        <div
          className="humidity-fill"
          style={{
            width: `${humidity}%`,
            backgroundColor: '#77BEE4',
            height: '100%',
            borderRadius: '5px',
            position: 'relative',
          }}
        >
          <div
            className="humidity-circle"
            style={{
              position: 'absolute',
              top: '50%',
              left: '100%',
              transform: 'translate(-50%, -50%)',
              width: '0.7em',
              height: '0.7em',
              backgroundColor: 'white',
              border: '5px solid rgb(94, 134, 194)',
              borderRadius: '50%',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
            }}
          ></div>
        </div>
      </div>



      {/* Thêm component SetWateringTime */}
      <SetWateringTime onTimeChange={handleTimeChange} wateringDuration= {wateringDuration} handleWateringDurationChange={handleWateringDurationChange} />
      <div style={{ width: '100%', display: 'flex', gap: '1em', alignItems: 'center', marginTop: '1em', justifyContent: 'center' }}>
        <span className='h3-bold'>Tưới Cây</span>
        <ToggleButton
          isOn={device.status}
          onToggle={() => handleToggleStatus(device.id)}
        />
      </div>

    </div>
  );
}

export default GardenTime;
