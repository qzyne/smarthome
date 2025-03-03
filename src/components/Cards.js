import React, { useEffect, useState } from "react";
import "../css/Cards.css";
import { Pencil, Plus, Trash, Trophy } from "phosphor-react";
import CardImg from "../img/card.png";
import {
  addCard,
  editCard,
  getAllCards,
  removeCard,
} from "../services/RFIDCardService";
import CardForm from "./CardForm";

const Cards = () => {
  const [showForm, setShowForm] = useState(false);
  const [cards, setCards] = useState([]); // Danh sách các thẻ đã tạo
  const [currentCard, setCurrentCard] = useState();
  const getCards = async () => {
    try {
      let res = await getAllCards();
      if (res && res.data && res.status === 200) {
        setCards(res.data);
        // console.log(res.data);
      }
    } catch (e) {}
  };
  useEffect(() => {
    getCards();
  }, [cards]);

  const handleCloseForm = () => {
    setShowForm(false); // Đóng form khi nhấn Hủy
  };

  const handleAddCard = () => {
    setCurrentCard(null); // Reset currentDevice khi thêm thiết bị mới
    setShowForm(true);
  };

  const handleEditCard = (card) => {
    setCurrentCard(card); // Điền giá trị thiết bị vào form khi chỉnh
    console.log(currentCard);

    setShowForm(true);
  };

  // Bổ sung code mới cho handleSubmitForm
  const handleSubmitForm = async (formData) => {
    if (currentCard) {
      try {
        let res = await editCard(
          currentCard.id,
          formData.cardUID,
          formData.accessLevel,
          formData.isActive
        );
        if (res && res.data && res.status === 200) {
          setShowForm(false);
          console.log(res.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        getCards();
      }
    } else {
      try {
        let res = await addCard(formData.cardUID);
        if (res && res.data && res.status === 200) {
          setShowForm(false);
          console.log(res.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        getCards();
      }
    }
  };

  const handleDeleteCard = async (id) => {
    let res = await removeCard(id);
    if (res && res.status === 200) {
      console.log(res.data);

      setCards((prevCard) => {
        prevCard.filter((card) => card.id !== id);
      });
    }
  };

  return (
    <div className="cards">
      <div className="h1-bold" style={{ gridColumn: "span 12" }}>
        Quản lý thẻ
      </div>

      <div className="actionCard">
        <button className="add-button" onClick={handleAddCard}>
          <span className="button-text">Thêm</span>
          <Plus className="button-icon" />
        </button>
      </div>

      {/* Hiển thị danh sách các thẻ */}
      {cards.map((card) => (
        <div className="card-wrapper" key={card.id}>
          <div className="cardImg">
            <img
              src={CardImg}
              alt="Card"
              style={{
                width: "9.375em",
                height: "9em",
                display: "block",
                margin: "0 auto",
              }}
            />
            <div className="h2-bold" style={{ textAlign: "center" }}>
              ID: {card.id}
            </div>
          </div>

          <div className="CardContent">
            <div
              style={{ display: "flex", width: "100%", justifyContent: "end" }}
            >
              {/* Chỉnh sửa button */}
              <button
                className="add-button"
                style={{ marginLeft: "3.5em" }}
                onClick={() => handleEditCard(card)}
              >
                <span className="button-text">Chỉnh sửa</span>
                <Pencil className="button-icon" size="1.25em" />
              </button>
              {/* Xóa button */}
              <button
                className="add-button"
                style={{ marginLeft: "1.5em" }}
                onClick={() => handleDeleteCard(card.id)}
              >
                <span className="button-text">Xóa</span>
                <Trash className="button-icon" size="1.25em" />
              </button>
            </div>

            <div className="cardInfo" style={{ marginBottom: "1em" }}>
              <span className="h3-bold">UID Card:</span>{" "}
              <span className="body0-regular" style={{ marginLeft: "1em" }}>
                {card.cardUID}
              </span>
            </div>
            <div className="cardInfo" style={{ marginBottom: "1em" }}>
              <span className="h3-bold">Mức độ truy cập:</span>{" "}
              <span className="body0-regular" style={{ marginLeft: "1em" }}>
                {card.accessLevel}
              </span>
            </div>
            <div className="cardInfo" style={{ marginBottom: "1em" }}>
              <span className="h3-bold">Trạng thái thẻ:</span>
              <span
                className={`body0-regular ${
                  card.isActive ? "active" : "inactive"
                }`}
                style={{ marginLeft: "1em" }}
              >
                {card.isActive ? "Hoạt động" : "Không hoạt động"}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Form overlay */}
      {showForm && (
        <CardForm
          currentCard={currentCard}
          onSubmit={handleSubmitForm}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Cards;
