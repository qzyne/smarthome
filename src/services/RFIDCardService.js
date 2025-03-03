import axios from "./AxiosCustom";
const token = localStorage.getItem("token");
const header = `Bearer ${token}`;

const getAllCards = () => {
  return axios.get("User/rfidcards", {
    headers: {
      Authorization: header,
    },
  });
};

const addCard = (cardUID) => {
  return axios.post(
    "User/rfidcards",
    { cardUID },
    {
      headers: {
        Authorization: header,
        "Content-Type": "application/json",
      },
    }
  );
};

const editCard = (cardId, cardUID, accessLevel, isActive) => {
  return axios.put(
    `User/rfidcards/${cardId}`,
    { cardUID, accessLevel, isActive },
    {
      headers: {
        Authorization: header,
        "Content-Type": "application/json",
      },
    }
  );
};

const removeCard = (cardId) => {
  return axios.delete(`User/rfidcards/${cardId}`, {
    headers: {
      Authorization: header,
    },
  });
};

export { getAllCards, editCard, removeCard, addCard };
