import React, { useState } from 'react';
import '../css/Cards.css';
import { Pencil, Plus, Trash } from 'phosphor-react';
import CardImg from '../img/card.png';

const Cards = () => {
  const [showForm, setShowForm] = useState(false);
  const [cardName, setCardName] = useState('');
  const [device, setDevice] = useState('');
  const [status, setStatus] = useState('Đang hoạt động');
  const [cards, setCards] = useState([]);  // Danh sách các thẻ đã tạo
  const [editIndex, setEditIndex] = useState(null);  // Chỉ mục thẻ đang chỉnh sửa
  const [editMode, setEditMode] = useState(false);  // Trạng thái chỉnh sửa

  const handleAddCard = () => {
    setShowForm(true);  // Hiển thị form khi nhấn nút Thêm
    setEditMode(false);  // Đảm bảo không vào chế độ chỉnh sửa
  };

  const handleCloseForm = () => {
    setShowForm(false); // Đóng form khi nhấn Hủy
    setEditMode(false);
  };

  // Bổ sung code mới cho handleSubmitForm
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const updatedCard = { cardName, device, status };

    // Kiểm tra giá trị của device trước khi thực hiện cập nhật
    console.log('Submitted device:', device);

    if (editMode) {
      const updatedCards = [...cards];
      updatedCards[editIndex] = updatedCard;  // Cập nhật thẻ đang chỉnh sửa
      setCards(updatedCards);
    } else {
      const newCard = { cardName, device, status };
      setCards([...cards, newCard]);  // Thêm thẻ mới vào danh sách
    }

    setShowForm(false);
    setCardName('');
    setDevice('');
    setStatus('Đang hoạt động');
    setEditMode(false);
    setEditIndex(null);
  };

  // Bổ sung code mới cho handleEditCard
  const handleEditCard = (index) => {
    setCardName(cards[index].cardName);
    setDevice(cards[index].device); // Đảm bảo rằng giá trị device được gán đúng khi chỉnh sửa
    setStatus(cards[index].status);
    setEditIndex(index);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDeleteCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);  // Loại bỏ thẻ tại vị trí index
    setCards(updatedCards);  // Cập nhật lại danh sách thẻ
  };

  return (
    <div className="cards">
      <div className="h1-bold" style={{ gridColumn: 'span 12' }}>Quản lý thẻ</div>

      <div className="actionCard">
        <button className="add-button" onClick={handleAddCard}>
          <span className="button-text">Thêm</span>
          <Plus className="button-icon" />
        </button>
      </div>

      {/* Hiển thị danh sách các thẻ */}
      {cards.map((card, index) => (
        <div className="card-wrapper" key={index}>
          <div className="cardImg">
            <img
              src={CardImg}
              alt="Card"
              style={{ width: '9.375em', height: '9em', display: 'block', margin: '0 auto' }}
            />
            <div className="h2-bold" style={{ textAlign: 'center' }}>ID: {index + 1}</div>
          </div>

          <div className="CardContent">
                
            <div style={{display:'flex', width:'100%', justifyContent:'end'}}>
              {/* Chỉnh sửa button */}
              <button className="add-button" style={{ marginLeft: '3.5em' }} onClick={() => handleEditCard(index)}>
                <span className="button-text">Chỉnh sửa</span>
                <Pencil className="button-icon" size="1.25em" />
              </button>
                    {/* Xóa button */}
              <button className="add-button" style={{ marginLeft: '1.5em' }} onClick={() => handleDeleteCard(index)}>
                <span className="button-text">Xóa</span>
                <Trash className="button-icon" size="1.25em" />
              </button>
            </div>
            
            <div className="cardInfo" style={{ marginBottom: '1em' }}>
              <span className="h3-bold">Tên thẻ:</span> <span className="body0-regular" style={{ marginLeft: '1em' }}>{card.cardName}</span>
            </div>
            <div className="cardInfo" style={{ marginBottom: '1em' }}>
              <span className="h3-bold">Thiết bị:</span> <span className="body0-regular" style={{ marginLeft: '1em' }}>{card.device}</span>
            </div>
            <div className="cardInfo" style={{ marginBottom: '1em' }}>
              <span className="h3-bold">Trạng thái thẻ:</span>
              <span
                className={`body0-regular ${card.status === 'Đang hoạt động' ? 'active' : 'inactive'}`}
                style={{ marginLeft: '1em' }}
              >
                {card.status}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Form overlay */}
      {showForm && (
        <div className="form-overlay">
          <form className="add-card-form" onSubmit={handleSubmitForm}>
            <h3>{editMode ? 'Chỉnh sửa thẻ' : 'Thêm thẻ mới'}</h3>

            <label>
              Tên thẻ:
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </label>

            <label>
              Thiết bị:
              <select
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                required
              >
                <option value="Cửa chính">Cửa chính</option>
                <option value="Cửa gara">Cửa gara</option>
                <option value="Phòng khách">Phòng khách</option>
              </select>
            </label>

            <label>
              Trạng thái thẻ:
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="Đang hoạt động">Đang hoạt động</option>
                <option value="Không hoạt động">Không hoạt động</option>
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

export default Cards;
