import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Menu from "../src/components/Menu.js";
import Home from "../src/components/Home.js";
import Regions from "../src/components/Regions.js";
import Devices from "../src/components/Devices.js";
import Security from "../src/components/Security.js";
import Cards from "../src/components/Cards.js";
import Consumption from "../src/components/Consumption.js";
import DeviceRegion from "../src/components/DeviceRegion.js";
import Login from "./components/Login.js";
import AuthenLayout from "./components/AuthenLayout.js";
import AppLayout from "./components/AppLayout.js";

// Component Layout chính
const MainLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthenLayout />}>
        <Route path="" element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/regions" element={<Regions />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/security" element={<Security />} />
          <Route
            path="/devices/consumption/:deviceId"
            element={<Consumption />}
          />
          <Route
            path="/regions/regionDeviceManagement/:location"
            element={<DeviceRegion />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};
function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
