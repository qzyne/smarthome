import "../css/Tempurature.css";
import React, { useState, useEffect } from "react";
import { Sun } from "phosphor-react";
import ToggleButton from "../components/ToggleButton";
import { getLastValue } from "../services/DHT11Services";
import { changeStateDevice, getDeviceById } from "../services/UserService";

const Tempurature = () => {
  const [device, setDevice] = useState({
    id: null,
    deviceName: "",
    roomId: null, // Giả định ID của thiết bị
    state: 1, // Trạng thái ban đầu của máy bơm
  });
  useEffect(() => {
    getFanPN();
  }, [device.state]);
  const getFanPN = async () => {
    try {
      let res = await getDeviceById(2);
      if (res && res.data) {
        // console.log("Dữ liệu từ server:", res.data);
        setDevice(res.data);
        // console.log(!device.state);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thiết bị:", error);
    }
  };
  const [DHTData, setDHTData] = useState({
    temperature: null,
    humidity: null,
    timeSpan: "",
    id: null,
  });
  useEffect(() => {
    getDHT11Sensor();
  }, [DHTData]);
  const getDHT11Sensor = async () => {
    var res = await getLastValue();
    if (res && res.data) {
      setDHTData(res.data);
    }
  };
  const handleToggleStatus = async (id) => {
    if (id === device.id) {
      var newState = 0;
      if (device.state === 1) {
        newState = 0;
      } else {
        newState = 1;
      }
      console.log(newState);
      try {
        let res = await changeStateDevice(id, newState);
        console.log("Trạng thái đã cập nhật lên server: ", res.data);
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái:", error);
      }

      setDevice((prevDevice) => ({
        ...prevDevice,
        state: newState,
      }));
      console.log(device);
    }
  };

  return (
    <div className="tempurature">
      <div className="h2-bold title">Phòng Ngủ</div>
      <div className="temp">
        <div className="content">
          <div className="body1-bold t1">Nhiệt độ</div>
          <div className="t2">{DHTData.temperature}</div>
          <div>
            <Sun className="sun-icon" size="1.5em" />
          </div>
        </div>
      </div>
      <div className="content-container">
        <span className="humidity body1-bold">Độ ẩm</span>
        <span className="percent h3-bold">{DHTData.humidity}%</span>
      </div>

      <div className="humidity-bar">
        <div
          className="humidity-fill"
          style={{ width: `${DHTData.humidity}%` }}
        ></div>
      </div>
      <div
        className="humidity-circle"
        style={{
          left:
            DHTData.humidity >= 80
              ? `calc(${DHTData.humidity}% - 2em)`
              : `calc(${DHTData.humidity}% - 1em)`,
          minWidth: "0px",
          maxWidth: "calc(100% - 12.5px)",
        }}
      ></div>

      <div className="motor">
        <span className="h3-bold">Máy Lạnh</span>
        <ToggleButton
          isOn={!!device.state}
          onToggle={() => handleToggleStatus(device.id)}
        />
      </div>
    </div>
  );
};

export default Tempurature;
