import React, { useState, useEffect } from "react";
import "../css/Regions.css";
import { Pencil, Plus, Trash } from "phosphor-react";
import { Link } from "react-router-dom";
import {
  addRoom,
  deleteRoom,
  getAllRooms,
  updateRoomName,
} from "../services/RoomService";
import RegionForm from "./RegionForm";

const Regions = () => {
  const [regionsData, setRegionsData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(null); // Thêm state để lưu thông tin khu vực đang chỉnh sửa
  useEffect(() => {
    fetchRegions();
  }, [regionsData]);
  const fetchRegions = async () => {
    let res = await getAllRooms();
    if (res && res.data) {
      setRegionsData(res.data);
    }
  };
  const handleAddRegion = () => {
    setCurrentRegion(null); // Reset currentRegion khi thêm khu vực mới
    setShowForm(true);
  };

  const handleEdit = (region) => {
    setCurrentRegion(region); // Điền giá trị khu vực vào form khi chỉnh sửa
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleSubmitForm = async (roomName) => {
    if (currentRegion) {
      // Cập nhật khu vực nếu là chỉnh sửa
      try {
        let res = await updateRoomName(currentRegion.id, roomName);
        if (res && res.data) {
          // toast
        }
        setShowForm(false);
      } catch (e) {
        console.log(e);
      } finally {
        fetchRegions();
      }
    } else {
      // Thêm khu vực mới
      try {
        let res = await addRoom(roomName);
        if (res && res.data) {
          // toast
          setShowForm(false);
        }
      } catch (e) {
        console.log(e);
      } finally {
        fetchRegions();
      }
    }
  };

  const handleDelete = async (id) => {
    let res = await deleteRoom(id);
    if (res && res.data) {
      setRegionsData((prevData) =>
        prevData.filter((region) => region.id !== id)
      );
    }
  };

  return (
    <div className="regions">
      <div className="h1-bold">Quản lý khu vực</div>
      <div className="addRegion">
        <button className="add-button" onClick={handleAddRegion}>
          <span className="button-text">Thêm</span>
          <Plus className="button-icon" />
        </button>
      </div>
      <div className="region-list">
        <table className="region-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Khu vực hoạt động</th>
              <th>Số lượng thiết bị</th>
              <th>Quản lý thiết bị</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {regionsData.map((region) => (
              <tr key={region.id}>
                <td>{region.id}</td>
                <td>{region.roomName}</td>
                <td>{region.amountOfDevice}</td>
                <td>
                  <a
                    href={`/regions/regionDeviceManagement/${region.id}`}
                    className="view-more-link"
                  >
                    Xem thêm
                  </a>
                </td>
                <td>
                  <button onClick={() => handleEdit(region)}>
                    {" "}
                    <Pencil size="1.25em" className="icon-pencil" />{" "}
                  </button>
                  <button onClick={() => handleDelete(region.id)}>
                    <Trash className="icon-trash" size="1.25em" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <RegionForm
          currentRegion={currentRegion}
          onSubmit={handleSubmitForm}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Regions;
