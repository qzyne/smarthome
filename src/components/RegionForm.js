import { useState } from "react";

const RegionForm = ({ currentRegion, onSubmit, onClose }) => {
  const [roomName, setRoomName] = useState(currentRegion?.roomName || "");
  const handleSubmitForm = (e) => {
    e.preventDefault();
    onSubmit(roomName);
  };
  return (
    <div className="form-overlay">
      <form className="add-region-form" onSubmit={handleSubmitForm}>
        <h3>{currentRegion ? "Chỉnh sửa khu vực" : "Thêm khu vực"}</h3>
        <label>
          Tên khu vực:
          <input
            type="text"
            name="regionName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
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
export default RegionForm;
