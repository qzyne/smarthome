import { useState } from "react";

const CardForm = ({ currentCard, onSubmit, onClose }) => {
  const [cardUID, setCardUID] = useState(currentCard?.cardUID || "");
  const [accessLevel, setAccessLevel] = useState(
    currentCard?.accessLevel || Number()
  );
  const [isActive, setIsActive] = useState(currentCard?.isActive || 0);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      cardUID,
      accessLevel,
      isActive,
    });
  };
  return (
    <div className="form-overlay">
      <form className="add-card-form" onSubmit={handleSubmit}>
        <h3>{currentCard ? "Chỉnh sửa thẻ" : "Thêm thẻ mới"}</h3>

        <label>
          Tên thẻ:
          <input
            type="text"
            value={cardUID}
            onChange={(e) => setCardUID(e.target.value)}
            required
          />
        </label>

        <label>
          Thiết bị:
          <select
            value={accessLevel}
            onChange={(e) => setAccessLevel(Number(e.target.value))}
            required
          >
            <option value="0">Chọn thiết bị</option>
            <option value="1">Cửa gara</option>
            <option value="2">Cửa sân</option>
            <option value="3">Cả 2 cửa</option>
          </select>
        </label>

        <label>
          Trạng thái thẻ:
          <select
            value={isActive ? "1" : "0"}
            onChange={(e) => setIsActive(e.target.value === "1")}
            required
          >
            <option value="1">Hoạt động</option>
            <option value="0">Không hoạt động</option>
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

export default CardForm;
