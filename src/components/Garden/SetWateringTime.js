import React, { useState } from 'react';

function SetWateringTime({ onTimeChange, handleWateringDurationChange, wateringDuration }) {
  const [hour, setHour] = useState(6); // Giờ mặc định
  const [minute, setMinute] = useState(0); // Phút mặc định
  const [successMessage, setSuccessMessage] = useState(''); // Thông báo thay đổi thành công

  const handleConfirm = () => {
    if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60 && wateringDuration >= 1 && wateringDuration <= 60) {
      // Gửi cả giờ, phút và thời gian tưới cây
      onTimeChange({ hour, minute, wateringDuration });

      // Hiển thị thông báo thành công
      setSuccessMessage('Thay đổi thành công!');
      setTimeout(() => setSuccessMessage(''), 3000); // Ẩn thông báo sau 3 giây
    } else {
      alert('Vui lòng nhập giá trị hợp lệ:\n- Giờ (0-23)\n- Phút (0-59)\n- Thời gian tưới cây (1-60 phút)');
    }
  };

  return (
    <div style={{ width: '100%', marginTop: '0em', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
      <div
        style={{
          paddingTop: '1.5em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gridColumn: 'span 2',
        }}
      >
        <label className="body3-regular" style={{ color: 'var(--bold-brown)', gridColumn: 'span 1' }}>
          Thời gian tưới cây (phút):
        </label>

        <input
          type="number"
          value={wateringDuration}
          onChange={handleWateringDurationChange}
          min="1"
          max="60"
          style={{
            padding: '0.5em',
            fontSize: '1em',
            marginLeft: '1em',
            width: '4em',
            borderRadius: '0.5em',
            border: '1px solid #ccc',
            gridColumn: 'span 1',
          }}
        />
      </div>
      <div
        className="body3-regular"
        style={{ marginBottom: '1em', color: 'var(--bold-brown)', textAlign: 'left', gridColumn: 'span 2' }}
      >
        Đặt giờ tưới cây:
      </div>

      <div
        style={{
          display: 'flex',
          marginBottom: '1em',
          gridColumn: 'span 2',
          gap: '1em',
          justifyContent: 'center',
        }}
      >
        <div style={{ alignItems: 'Right' }}>
          <label>Giờ:</label>
          <input
            type="number"
            value={hour}
            onChange={(e) => setHour(Number(e.target.value))}
            min="0"
            max="23"
            style={{
              padding: '0.5em',
              fontSize: '1em',
              width: '3em',
              borderRadius: '0.5em',
              border: '1px solid #ccc',
              outline: 'none',
              marginLeft: '0.5em',
            }}
          />
        </div>

        <div>
          <label>Phút:</label>
          <input
            type="number"
            value={minute}
            onChange={(e) => setMinute(Number(e.target.value))}
            min="0"
            max="59"
            style={{
              padding: '0.5em',
              fontSize: '1em',
              width: '3em',
              borderRadius: '0.5em',
              border: '1px solid #ccc',
              outline: 'none',
              marginLeft: '0.5em',
            }}
          />
        </div>
      </div>
      <div style={{ width: '100%', gridColumn: 'span 2' }}>
        <button
          onClick={handleConfirm}
          className="note"
          style={{
            padding: '0.5em',
            color: '#fff',
            backgroundColor: '#2A9E8E',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            width: '10em',
          }}
        >
          Xác nhận
        </button>
      </div>
      {successMessage && (
        <div
          style={{
            color: '#2A9E8E',
            marginTop: '1em',
            fontWeight: 'bold',
            textAlign: 'center',
            gridColumn: 'span 2',
          }}
        >
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default SetWateringTime;
