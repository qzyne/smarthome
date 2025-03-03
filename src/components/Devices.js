import React, { useState, useEffect } from "react";
import "../css/Devices.css";
import { Pencil, Plus, Trash } from "phosphor-react";
import { getAccordionActionsUtilityClass } from "@mui/material";
import DeviceForm from "./DeviceForm";
import {
  addDevice,
  deleteDevice,
  getAllDevices,
  updateDevice,
  changeStateDevice,
} from "../services/UserService";
import { getAllRooms } from "../services/RoomService";
import ToggleButton from "./ToggleButton";

const Devices = () => {
  const [devicesData, setDevicesData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(); // Thêm state để lưu thông tin thiết bị đang chỉnh sửa
  const [room, setRoom] = useState([]);
  useEffect(() => {
    console.log("currentDevice đã được cập nhật:", currentDevice);
  }, [currentDevice]);
  useEffect(() => {
    fetchListRoom();
  }, []);
  const fetchListRoom = async () => {
    let res = await getAllRooms();
    if (res && res.data) {
      setRoom(res.data);
    }
  };
  useEffect(() => {
    // Mock API Fetch (replace with actual API call)
    fetchListDevice();
  }, [devicesData]);
  const fetchListDevice = async () => {
    let res = await getAllDevices();
    if (res && res.data) {
      setDevicesData(res.data);

      // console.log(res.data);
    }
  };

  const handleAddDevice = () => {
    setCurrentDevice(null); // Reset currentDevice khi thêm thiết bị mới
    setShowForm(true);
  };

  const handleEdit = (device) => {
    setCurrentDevice(device); // Điền giá trị thiết bị vào form khi chỉnh
    console.log(currentDevice);

    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleSubmitForm = async (formData) => {
    if (currentDevice) {
      // Cập nhật thiết bị nếu là chỉnh sửa
      try {
        console.log(formData);
        let res = await updateDevice(
          currentDevice.device.id,
          formData.deviceName,
          formData.roomId,
          formData.state
        );
        if (res && res.data) {
          setShowForm(false);
          console.log(res.data);
        }
      } catch (e) {
        console.log("Lỗi chỉnh sửa!");
      } finally {
        fetchListDevice();
      }
    } else {
      // Thêm thiết bị mới
      try {
        let res = await addDevice(
          formData.deviceName,
          formData.roomId,
          formData.state
        );
        if (res && res.data) {
          // console.log(res.data);
          // setDevicesData((prevData) => [...prevData, res.data.device]);
          setShowForm(false);
        }
      } catch (e) {
        console.log(e);
      } finally {
        fetchListDevice();
      }
    }
  };

  const handleDelete = async (id) => {
    let res = await deleteDevice(id);
    if (res && res.data) {
      console.log(res.data);
      setDevicesData((prevData) =>
        prevData.filter((device) => device.device.id !== id)
      );
    }
  };
  // const handleChangeState = (e) => {
  //   const newState = Number(e.target.value);
  //   setCurrentDevice((prevDevice) => ({
  //     ...prevDevice,
  //     device: {
  //       ...prevDevice.device,
  //       state: newState, // Cập nhật state mới
  //     },
  //   }));
  //   console.log(currentDevice);
  // };
  const handleToggleStatus = async (device) => {
    var newState = 0;
    if (device.state === 1) {
      newState = 0;
    } else {
      newState = 1;
    }
    try {
      let res = await changeStateDevice(device.id, newState);
      if (res && res.data) {
        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      fetchListDevice();
    }
  };

  return (
    <div className="devices">
      <div className=" h1-bold">Quản lý thiết bị</div>
      <div className="addDevice">
        <button className="add-button" onClick={handleAddDevice}>
          <span className="button-text">Thêm</span>
          <Plus className="button-icon" />
        </button>
      </div>
      <div className="device-list">
        <table className="device-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Thiết bị</th>
              <th>Khu Vực Hoạt Động</th>
              <th>Trạng thái</th>
              <th>Lịch sử tiêu thụ điện</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {devicesData.map((item) => (
              <tr key={item.device.id}>
                <td>{item.device.id}</td>
                <td>{item.device.deviceName}</td>
                <td>{item.roomName}</td>
                {/* <td>{item.device.state}</td> */}
                <td>
                  <div className="toggle-button-wrapper">
                    <ToggleButton
                      isOn={!!item.device.state}
                      onToggle={() => handleToggleStatus(item.device)}
                    />
                  </div>
                </td>
                <td>
                  <a
                    href={`/devices/consumption/${item.device.id}`}
                    className="view-more-link"
                  >
                    Xem thêm
                  </a>
                </td>
                <td>
                  <button onClick={() => handleEdit(item)}>
                    {" "}
                    <Pencil size="1.25em" className="icon-pencil" />{" "}
                  </button>
                  <button onClick={() => handleDelete(item.device.id)}>
                    <Trash className="icon-trash" size="1.25em" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <DeviceForm
          currentDevice={currentDevice}
          rooms={room}
          onSubmit={handleSubmitForm}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Devices;
