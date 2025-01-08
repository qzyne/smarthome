import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/Consumption.css'
import { CaretRight, CaretLeft } from 'phosphor-react';
import FilterDropdownDevice from '../components/FilterDropDownDevice';
import DeviceChart from './DeviceChart';
import BackButton from './BackButton';


const Consumption = () => {
    // tần suất tiểu thụ điện
  const time = 'Tối (18h - 24h)';
  const dailyDataDevice = [10, 15, 8, 12, 20, 25, 18];
  const weeklyDataDevice = [20, 10, 55, 90, 25];
  const monthlyDataDevice = [300, 400, 320, 500, 200];
  const { deviceId } = useParams(); // Lấy deviceId từ URL
  const [deviceName, setDeviceName] = useState("");
  const [consumptionData, setConsumptionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 5; // Số mục mỗi trang
  const [selectedFilterDevice, setSelectedFilterDevice] = useState('daily');
  const [chartDataDevice, setChartDataDevice] = useState(dailyDataDevice);
  // Dữ liệu nhãn (labels) bar chart
  const labelsDevice = {
    daily: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
    weekly: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
    monthly: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
  };
     // Xử lý thay đổi bộ lọc
  const handleFilterChangeDevice = (filter) => {
    setSelectedFilterDevice(filter);

    if (filter === 'daily') setChartDataDevice(dailyDataDevice);
    if (filter === 'weekly') setChartDataDevice(weeklyDataDevice);
    if (filter === 'monthly') setChartDataDevice(monthlyDataDevice);
  };

  const totalEnergyUsageDeivce = 340;

  useEffect(() => {
    // Mock API call để lấy thông tin lịch sử hoạt động của thiết bị
    const fetchConsumptionData = async () => {
      const data = [
        { id: 1, deviceId: 1, deviceName: "Thiết bị 1", user: "Nguyễn Văn A", activityTime: "2025-01-01", consumption: 2.5 },
        { id: 2, deviceId: 1, deviceName: "Thiết bị 1", user: "Lê Thị B", activityTime: "2025-01-02", consumption: 3.0 },
        ...Array.from({ length: 50 }, (_, i) => ({
          id: i + 3,
          deviceId: 1,
          deviceName: `Thiết bị ${i + 3}`,
          user: `Người dùng ${i + 3}`,
          activityTime: `2025-01-0${i % 9 + 1}`,
          consumption: (Math.random() * 5).toFixed(2),  // Giả lập lượng tiêu thụ
        })),
      ];

      const filteredData = data.filter(entry => entry.deviceId === parseInt(deviceId)); // Lọc theo deviceId
      // Sắp xếp dữ liệu theo ngày hoạt động từ mới nhất đến cũ nhất
      const sortedData = filteredData.sort((a, b) => new Date(b.activityTime) - new Date(a.activityTime));
      setConsumptionData(sortedData);
    };

    // Mock API call để lấy thông tin tên thiết bị từ ID
    const fetchDeviceName = async () => {
      const devices = [
        { id: 1, name: "Thiết bị 1" },
        { id: 2, name: "Thiết bị 2" },
        { id: 3, name: "Thiết bị 3" },
      ];
      const device = devices.find(d => d.id === parseInt(deviceId));
      if (device) {
        setDeviceName(device.name);
      }
    };

    fetchConsumptionData();
    fetchDeviceName();
  }, [deviceId]);

  // Xác định dữ liệu hiển thị cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consumptionData.slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil(consumptionData.length / itemsPerPage);

  // Hiển thị các trang cần thiết (tối đa 3 trang)
  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 1); // Lấy 1 trang trước
    let endPage = Math.min(totalPages, currentPage + 1); // Lấy 1 trang sau

    if (endPage - startPage < 2) {
      startPage = Math.max(1, endPage - 2); // Điều chỉnh startPage nếu không đủ 3 trang
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Thêm điều kiện để disable nút nếu đang ở trang đầu tiên hoặc cuối cùng
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="consumption">
      <div className="h1-bold">Lịch Sử Tiêu Thụ Điện: {deviceName} (ID: {deviceId})</div>
      {/* Breadcrumb */}
      <div className="breadcrumb" style={{ display: 'flex', alignItems: 'center', paddingTop: '0.75em', paddingBottom: '1.5em' }}>
        <Link to="/devices"><span className="body1-regular">Quản lý thiết bị</span></Link>
        <CaretRight size="1em" style={{ margin: '0 0.625em' }} />
        <span className="body1-regular">Lịch sử Tiêu thụ Điện: {deviceName} (ID: {deviceId})</span>
      </div>

      <BackButton/>
      <div className="table-content">
        <table>
          <thead>
            <tr>
              <th>Người dùng</th>
              <th>Thời gian hoạt động</th>
              <th>Lượng tiêu thụ điện</th>  {/* Cột Lượng tiêu thụ điện */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.user}</td>
                <td>{entry.activityTime}</td>
                <td>{entry.consumption} kWh</td>  {/* Hiển thị lượng tiêu thụ điện */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination" style={{ marginTop: '1em', textAlign: 'center' }}>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          style={{
            padding: '0.5em 1em',
            backgroundColor: currentPage === 1 ? '#f4f4f4' : 'var(--light-brown)',
            color: currentPage === 1 ? '#ccc' : '#fff',
            border: '1px solid #ccc',
            borderRadius:'8px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          <CaretLeft size="1em" />
        </button>

        {/* Hiển thị các số trang */}
        {getPageNumbers().map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            style={{
              padding: '0.5em 1em',
              margin: '0 0.25em',
              backgroundColor: pageNumber === currentPage ? 'var(--light-brown)' : '#f4f4f4',
              color: pageNumber === currentPage ? '#fff' : 'var(--bold-brown)',
              border: '1px solid #ccc',
              borderRadius:'8px',
              cursor: 'pointer',
            }}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          style={{
            padding: '0.5em 1em',
            backgroundColor: currentPage === totalPages ? '#f4f4f4' : 'var(--light-brown)',
            color: currentPage === totalPages ? '#ccc' : '#fff',
            border: '1px solid #ccc',
            borderRadius:'8px',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          <CaretRight size="1em" />
        </button>
        
      </div>

      <div className='consump-chart' style={{paddingTop: '2.5em'}}>
        {/* <div className='h2-bold' style={{ textAlign: "center"}}>Tần suất sử dụng điện</div> */}
        <div style={{display:'flex', justifyContent:'space-between', paddingTop:'1.5em'}}>
          <div className='body1-bold' style={{
            color: 'var(--bold-brown)', 
            display: 'flex', 
            alignItems: 'center', 
            gap:'0.625em'}}>
              Tổng điện tiêu thụ: 
              <span style={{color:'var(--primary-color)'}}>{totalEnergyUsageDeivce}kWh/ tháng</span>
          </div>

          <div className='body3-regular' style={{display:"flex", alignItems:'center', gap:'0.625em'}}>
            Tổng quan dữ liệu theo:
            <FilterDropdownDevice selectedFilterDevice={selectedFilterDevice} onFilterChangeDevice={handleFilterChangeDevice} />
          </div>
        </div>
        
        <div className='body1-bold' style={{
            color: 'var(--bold-brown)', 
            display: 'flex', 
            alignItems: 'center', 
            gap:'0.625em',
            marginTop:'0.75em'
          }}>Khung giờ tiêu thụ nhiều: 
          <span style={{color:'var(--primary-color)'}}>{time}</span>
        </div>


        <div className='device-chart'>
        <DeviceChart selectedFilterDevice={selectedFilterDevice} chartDataDevice={chartDataDevice} labelsDevice={labelsDevice} />
        </div>
        <div className='body1-regular' style={{paddingTop:'1.5em', display:'flex', justifyContent:'center'}}>Biểu đồ tần suất sử dụng điện: {deviceName} (Id: {deviceId})</div>
      </div>

    </div>
  );
};

export default Consumption;
