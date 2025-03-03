import { useState } from "react";
const DeviceForm = ({ currentDevice, rooms, onSubmit, onClose }) => {
  // Khởi tạo state cho các trường input
  const [deviceName, setDeviceName] = useState(
    currentDevice?.device.deviceName || ""
  );
  const [roomId, setRoomId] = useState(currentDevice?.device.roomId || "");
  const [state, setState] = useState(currentDevice?.device.state || 0);

  // Xử lý khi form được submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      deviceName,
      roomId,
      state,
    });
  };

  return (
    <div className="form-overlay">
      <form className="add-device-form" onSubmit={handleSubmit}>
        <h3>{currentDevice ? "Chỉnh sửa thiết bị" : "Thêm thiết bị"}</h3>
        <label>
          Tên thiết bị:
          <input
            type="text"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            required
          />
        </label>
        <label>
          Khu vực hoạt động:
          <select
            value={roomId}
            onChange={(e) =>
              setRoomId(e.target.value === "" ? null : Number(e.target.value))
            }
          >
            <option value="">Chọn khu vực</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.roomName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Trạng thái:
          <select
            value={state}
            onChange={(e) => setState(Number(e.target.value))}
            required
          >
            <option value={1}>Hoạt động</option>
            <option value={0}>Không hoạt động</option>
          </select>
        </label>
        <div className="form-buttons">
          <button type="submit">Lưu</button>
          <button type="button" onClick={onClose}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeviceForm;
