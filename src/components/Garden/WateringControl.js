import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function WateringControl() {
  const [wateringTime, setWateringTime] = useState(5); // Giá trị mặc định là 5 phút

  const handleInputChange = (event) => {
    const value = event.target.value;

    // Chỉ cho phép nhập giá trị là số và trong khoảng từ 1 đến 60 phút
    if (value === '' || /^[0-9]+$/.test(value)) {
      setWateringTime(value);
    }
  };

  const handleSetWateringTime = () => {
    // Gửi thời gian tưới cây đến backend hoặc xử lý thêm
    if (wateringTime < 1 || wateringTime > 60) {
      alert("Please enter a value between 1 and 60 minutes.");
      return;
    }
    console.log("Watering time set to:", wateringTime, "minutes");
    // Bạn có thể gọi API hoặc gửi thông tin này tới hệ thống điều khiển tưới cây
  };

  return (
    <div style={{ padding: 20 }}>
      <TextField
        label="Watering Time (minutes)"
        type="number"
        value={wateringTime}
        onChange={handleInputChange}
        InputProps={{
          inputMode: 'numeric', // Giúp hỗ trợ nhập số trên di động
        }}
        fullWidth
      />

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSetWateringTime} 
        style={{ marginTop: 20 }}
      >
        Set Watering Time
      </Button>
    </div>
  );
}

export default WateringControl;
