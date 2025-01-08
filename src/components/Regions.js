import React, { useState, useEffect } from 'react';
import '../css/Regions.css';
import { Pencil, Plus, Trash } from 'phosphor-react';
import { Link } from 'react-router-dom';

const Regions = () => {
  const [regionsData, setRegionsData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(null); // Thêm state để lưu thông tin khu vực đang chỉnh sửa

  useEffect(() => {
    // Mock API Fetch (replace with actual API call)
    const fetchRegions = async () => {
      const data = [
        { id: 4, location: "Phòng khách" },
        { id: 5, location: "Phòng ngủ" },
        { id: 6, location: "Nhà bếp" }
      ];
      setRegionsData(data);
    };

    fetchRegions();
  }, []);

  const handleAddRegion = () => {
    setCurrentRegion(null); // Reset currentRegion khi thêm khu vực mới
    setShowForm(true);
  };

  const handleEdit = (region) => {
    setCurrentRegion(region); // Điền giá trị khu vực vào form khi chỉnh sửa
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newRegion = {
      id: currentRegion ? currentRegion.id : Date.now(), // Nếu là chỉnh sửa, giữ ID cũ, nếu là thêm mới thì tạo ID mới
      location: formData.get('regionName'),
    };

    if (currentRegion) {
      // Cập nhật khu vực nếu là chỉnh sửa
      setRegionsData(prevData => prevData.map(region => region.id === currentRegion.id ? newRegion : region));
    } else {
      // Thêm khu vực mới
      setRegionsData(prevData => [...prevData, newRegion]);
    }

    setShowForm(false);
  };

  const handleDelete = (id) => {
    console.log("Xóa khu vực với ID: ", id);
    setRegionsData(prevData => prevData.filter(region => region.id !== id));
  };

  return (
    <div className="regions">
      <div className="h1-bold">Quản lý khu vực</div>
      <div className="addRegion">
        <button className="add-button" onClick={handleAddRegion}>
          <span className='button-text'>Thêm</span>
          <Plus className='button-icon' />
        </button>
      </div>
      <div className="region-list">
        <table className="region-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Khu vực hoạt động</th>
              <th>Quản lý thiết bị</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {regionsData.map(region => (
              <tr key={region.location}>
                <td>{region.id}</td>
                <td>{region.location}</td>
                <td><a href={`/regions/regionDeviceManagement/${region.location}`} className="view-more-link">Xem thêm</a></td>
                <td>
                  <button onClick={() => handleEdit(region)}> <Pencil size='1.25em' className='icon-pencil' /> </button>
                  <button onClick={() => handleDelete(region.id)}><Trash className='icon-trash' size='1.25em' /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="form-overlay">
          <form className="add-region-form" onSubmit={handleSubmitForm}>
            <h3>{currentRegion ? 'Chỉnh sửa khu vực' : 'Thêm khu vực'}</h3>
            <label>
              Tên khu vực:
              <input type="text" name="regionName" defaultValue={currentRegion?.location || ''} required />
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

export default Regions;
