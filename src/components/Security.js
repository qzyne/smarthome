// Security.js
import React, { useState } from "react";
import "../css/Security.css";
import faceIdImage from "../img/Face_ID.png";
import { addUserFace } from "../services/UserFaceService";
// import { EnvelopeSimple } from "phosphor-react";

const Security = () => {
  const [faceImages, setFaceImages] = useState([]);
  const [nameData, setNameData] = useState("");
  const [base64FaceImg, setBase64Faceimg] = useState("");

  const handleSetupFaceId = async (e) => {
    e.preventDefault();
    let res = await addUserFace(nameData, base64FaceImg);
    // console.log(nameData);
    // console.log(base64FaceImg);
    if (res && res.status === 200) {
      console.log(res.data);
    } else {
      console.log(res);
    }
    if (faceImages.length > 0) {
      alert(`Đã thiết lập ${faceImages.length} khuôn mặt thành công!`);
    } else {
      alert(
        "Vui lòng tải lên ít nhất một hình ảnh khuôn mặt để thiết lập Face ID."
      );
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && faceImages.length < 2) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        const image = reader.result;
        setFaceImages((prevImages) => [...prevImages, image]);
        setBase64Faceimg(base64String);
      };
      reader.readAsDataURL(file);
    } else if (faceImages.length >= 2) {
      alert("Chỉ được thiết lập tối đa 2 khuôn mặt.");
    }
  };

  return (
    <div className="security">
      <div className="h1-bold">Bảo mật</div>

      <div className="face-id-container">
        {faceImages.length === 0 ? (
          <img src={faceIdImage} alt="Face ID" className="face-id-image" />
        ) : (
          faceImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Face ${index + 1}`}
              className="face-id-image"
            />
          ))
        )}
      </div>

      <div className="upload-container">
        <label htmlFor="nameData" className="upload-label">
          Tên dữ liệu khuôn mặt:
        </label>
        <input
          id="nameData"
          type="text"
          placeholder="Enter your name face data"
          value={nameData}
          onChange={(e) => setNameData(e.target.value)}
        />
      </div>
      <div className="upload-container">
        <label htmlFor="upload-face" className="upload-label">
          Chọn ảnh khuôn mặt:
        </label>
        <input
          id="upload-face"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      <button className="setup-faceid-button" onClick={handleSetupFaceId}>
        Thiết lập Face ID
      </button>
    </div>
  );
};

export default Security;
