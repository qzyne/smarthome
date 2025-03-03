import React, { useState } from 'react';
import { CaretDown } from 'phosphor-react';

const FilterDropdownDevice = ({ selectedFilterDevice, onFilterChangeDevice }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Map cho hiển thị lựa chọn tương ứng
  const options = {
    daily: "Ngày",
    weekly: "Tuần",
    monthly: "Tháng",
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        className="body2-bold"
        onClick={toggleDropdown}
        style={{
          borderRadius: '20px',
          border: '1px solid #D4C5A7',
          padding: '9px 30px 9px 9px',
          textAlign: 'center',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {options[selectedFilterDevice]} {/* Hiển thị chữ tương ứng */}
        <CaretDown
          size={20}
          style={{
            color: 'var(--primary-color)',
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      </div>
      
      {isOpen && (
        <ul
          style={{
            listStyle: 'none',
            padding: '0',
            margin: '0',
            position: 'absolute',
            top: '100%',
            left: '0',
            width: '100%',
            borderRadius: '20px',
            border: '1px solid #D4C5A7',
            backgroundColor: 'white',
            zIndex: 1,
            overflow: 'hidden'
          }}
        >
          {/* Sử dụng các giá trị tương ứng cho từng option */}
          <li
            onClick={() => onFilterChangeDevice('daily')}
            style={{
              padding: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f1f1'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          >
            Ngày
          </li>
          <li
            onClick={() => onFilterChangeDevice('weekly')}
            style={{
              padding: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f1f1'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          >
            Tuần
          </li>
          <li
            onClick={() => onFilterChangeDevice('monthly')}
            style={{
              padding: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f1f1f1'; // Đảm bảo border-radius vẫn giữ
            }}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          >
            Tháng
          </li>
        </ul>
      )}
    </div>
  );
};

export default FilterDropdownDevice;