import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from '../src/components/Menu.js';
import Home from '../src/components/Home.js';
import Regions from '../src/components/Regions.js';
import Devices from '../src/components/Devices.js';
import Security from '../src/components/Security.js';
import Cards from '../src/components/Cards.js';
import Consumption from '../src/components/Consumption.js';
import DeviceRegion from '../src/components/DeviceRegion.js';

function App() {
  return (
    <Router>
      <div className="grid-container">
        <Menu />
        <Routes>
          {/* Trang chủ */}
          <Route path="/" element={<Home />} />

          {/* Quản lý thiết bị */}
          <Route path="/devices" element={<Devices />} />

          {/* Quản lý khu vực */}
          <Route path="/regions" element={<Regions />} />

          {/* Quản lý thẻ */}
          <Route path="/cards" element={<Cards />} />

          {/* Bảo mật */}
          <Route path="/security" element={<Security />} />

          {/* Chi tiết mức tiêu thụ của thiết bị */}
          <Route path="/devices/consumption/:deviceId" element={<Consumption />} />

          {/* Quản lý thiết bị trong khu vực */}
          <Route path="/regions/regionDeviceManagement/:location" element={<DeviceRegion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
