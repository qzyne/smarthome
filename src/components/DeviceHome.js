import React, { useState } from 'react';
import '../css/DeviceHome.css';
import fanImg from '../img/fan.jpg';
import lightImg from '../img/light.jpg';
import ToggleButton from './ToggleButton';
const DeviceHome = () => {
  const [activeTab, setActiveTab] = useState('light');

  return (
    <div className="device-home">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'light' ? 'active' : ''}`}
          onClick={() => setActiveTab('light')}
        >
          Đèn
        </button>
        <button
          className={`tab-button ${activeTab === 'fan' ? 'active' : ''}`}
          onClick={() => setActiveTab('fan')}
        >
          Quạt
        </button>
      </div>
      <div className="slider-container">
        <div className={`slider ${activeTab === 'fan' ? 'slide-left' : ''}`}>
          <div className="light">
            <div style={{marginTop:'1em'}}>
                <span className='h2-bold' style={{justifyContent:'center', display:'flex'}}>Thiết bị</span>
                <img src= {lightImg} alt="Light" className="image" />
            </div>
            <div className='light-control'>
                <div className='light-content'>
                <span className='h3-bold'>Mở tất cả</span>
                <ToggleButton/>
                </div>
                <div style={{
                    fontSize:'0.75em', 
                    color:'var(--bold-brown)',
                    padding: '0 1.25em'
                    }}>
                        Tất cả thiết bị đèn trong nhà đều được bật.
                </div>
            </div>
          </div>

          <div className="fan">
            <div style={{marginTop:'1em'}}>
                <span className='h2-bold' style={{justifyContent:'center', display:'flex'}}>Thiết bị</span>
                <img src= {fanImg} alt="Fan" className="image" />
            </div>
            <div className='fan-control'>
                <div className='fan-content'>
                <span className='h3-bold'>Mở tất cả</span>
                <ToggleButton/>
                </div>
                <div style={{
                    fontSize:'0.75em', 
                    color:'var(--bold-brown)',
                    padding: '0 1.25em'
                    }}>
                        Tất cả thiết bị quạt trong nhà đều được bật.
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceHome;
