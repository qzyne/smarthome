import React, { useState, useEffect } from 'react';
import '../css/Devices.css';
import { Pencil, Plus, Trash } from 'phosphor-react';

const Devices = () => {
  const [devicesData, setDevicesData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(null); // Thêm state để lưu thông tin thiết bị đang chỉnh sửa

  useEffect(() => {
    // Mock API Fetch (replace with actual API call)
    const fetchDevices = async () => {
      const data = [
        { id: 1, name: "Thiết bị 1", location: "Phòng khách", status: "Hoạt động"},
        { id: 2, name: "Thiết bị 2", location: "Phòng ngủ", status: "Không hoạt động" },
        { id: 3, name: "Thiết bị 3", location: "Nhà bếp", status: "Hoạt động"}
      ];
      setDevicesData(data);
    };
    
    fetchDevices();
  }, []);

  const handleAddDevice = () => {
    setCurrentDevice(null); // Reset currentDevice khi thêm thiết bị mới
    setShowForm(true);
  };

  const handleEdit = (device) => {
    setCurrentDevice(device); // Điền giá trị thiết bị vào form khi chỉnh sửa
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDevice = {
      id: currentDevice ? currentDevice.id : Date.now(), // Nếu là chỉnh sửa, giữ ID cũ, nếu là thêm mới thì tạo ID mới
      name: formData.get('deviceName'),
      location: formData.get('deviceLocation'),
      status: formData.get('deviceStatus'),
    };

    if (currentDevice) {
      // Cập nhật thiết bị nếu là chỉnh sửa
      setDevicesData(prevData => prevData.map(device => device.id === currentDevice.id ? newDevice : device));
    } else {
      // Thêm thiết bị mới
      setDevicesData(prevData => [...prevData, newDevice]);
    }

    setShowForm(false);
  };

  const handleDelete = (id) => {
    console.log("Xóa thiết bị với ID: ", id);
    setDevicesData(prevData => prevData.filter(device => device.id !== id));
  };

  return (
    <div className="devices">
      <div className="title-device h1-bold">Quản lý thiết bị</div>
      <div className="addDevice">
        <button className="add-button" onClick={handleAddDevice}>
          <span className='button-text'>Thêm</span>
          <Plus className='button-icon'/>
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
            {devicesData.map(device => (
              <tr key={device.id}>
                <td>{device.id}</td>
                <td>{device.name}</td>
                <td>{device.location}</td>
                <td>{device.status}</td>
                <td><a href={`/devices/consumption/${device.id}`} className="view-more-link">Xem thêm</a></td>
                <td>
                  <button onClick={() => handleEdit(device)}> <Pencil size= '1.25em' className='icon-pencil'/> </button>
                  <button onClick={() => handleDelete(device.id)}><Trash className='icon-trash' size='1.25em'/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="form-overlay">
          <form className="add-device-form" onSubmit={handleSubmitForm}>
            <h3>{currentDevice ? 'Chỉnh sửa thiết bị' : 'Thêm thiết bị'}</h3>
            <label>
              Tên thiết bị:
              <input type="text" name="deviceName" defaultValue={currentDevice?.name || ''} required />
            </label>
            <label>
              Khu vực hoạt động:
              <select name="deviceLocation" defaultValue={currentDevice?.location || ''} required>
                <option value="living-room">Phòng khách</option>
                <option value="bedroom">Phòng ngủ</option>
                <option value="kitchen">Nhà bếp</option>
                <option value="garden">Vườn</option>
              </select>
            </label>
            <label>
              Trạng thái:
              <select name="deviceStatus" defaultValue={currentDevice?.status || ''} required>
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </label>
            <div className="form-buttons">
              <button type="submit">Lưu</button>
              <button type="button" onClick={handleCloseForm}>Hủy</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Devices;
