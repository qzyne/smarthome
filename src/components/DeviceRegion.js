import React, { useState } from 'react';
import '../css/DeviceRegion.css';
import { Plus, Trash, CaretRight } from 'phosphor-react';
import ToggleButton from './ToggleButton';
import BackButton from './BackButton';
import { Link } from 'react-router-dom';
import GardenChart from '../components/Garden/GardenChart';
import GardenTime from './Garden/GardenTime';
import FilterDropdownLine from './Garden/FilterDropdownLine';
import FilterDropdownRoom from '../components/FilterDropdownRoom';
import FilterDropdownExhaust from './FilterDropdownExhaust';
import Tempurature from './Tempurature';
import ConditionChart from './ConditionChart';
import ExhaustChart from './ExhaustChart';
import { useParams } from 'react-router-dom';
const DeviceRegion = () => {
    
    // Độ ẩm đất
    const dailyDataLine = [10, 15, 8, 12, 20, 25, 18];
    const weeklyDataLine = [50, 70, 55, 80, 65];
    const monthlyDataLine = [50, 40, 30];
    //Độ ẩm phòng
    const dailyDataRoom = [50, 15, 8, 42, 20, 45, 18];
    const weeklyDataRoom = [70, 73, 25, 10, 45];
    const monthlyDataRoom = [50, 40, 45];
    //Độ ẩm khí thải
    const dailyDataExhaust = [
        [586, 25, 890],
        [689, 48, 980],
        [765, 34, 679],
        [586, 25, 890],
        [689, 48, 980],
        [765, 34, 679],
        [586, 25, 890],
      ];
    const weeklyDataExhaust = [[700, 73, 205], [100, 45, 300], [600, 15, 200]];
    const monthlyDataExhaust = [[500, 40, 450], [30, 35, 200], [25, 50, 105]];

    const [selectedFilterLine, setSelectedFilterLine] = useState('daily');
    const [selectedFilterExhaust, setSelectedFilterExhaust] = useState('daily');
    const [selectedFilterRoom, setSelectedFilterRoom] = useState('daily');

    const [chartDataLine, setChartDataLine] = useState(dailyDataLine);
    const [chartDataRoom, setChartDataRoom] = useState(dailyDataRoom);
    const [chartDataExhaust, setChartDataExhaust] = useState(dailyDataExhaust);
    const hour = 16;
    const minute = 22;
    const [devices, setDevices] = useState([
        { id: 1, name: 'Cảm biến khí', status: false },
        { id: 2, name: 'Đèn', status: true },
        { id: 3, name: 'Máy lạnh', status: false },
    ]);
    const [showForm, setShowForm] = useState(false);
    const [currentDevice, setCurrentDevice] = useState(null);
    const [availableDevices, setAvailableDevices] = useState([
        { id: 1, name: 'Máy bơm', status: false },
        { id: 2, name: 'Đèn', status: false },
        { id: 3, name: ' Quạt', status: false },
    ]);

    // label của Line chart độ ảm đất
    const labelsLine = {
        daily: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
        weekly: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
        monthly: ['Tháng 1', 'Tháng 2', 'Tháng 3'],
    };
    // label của Line chart độ ẩm phòng
    const labelsRoom = {
        daily: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
        weekly: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
        monthly: ['Tháng 1', 'Tháng 2', 'Tháng 3'],
    };

    // label của chart Khí thải
    const labelsExhaust = {
        daily: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
        weekly: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
        monthly: ['Tháng 1', 'Tháng 2', 'Tháng 3'],
    };

    // Biểu đồ độ ẩm
    const handleFilterChangeLine = (filterLine) => {
        setSelectedFilterLine(filterLine);

        if (filterLine === 'daily') setChartDataLine(dailyDataLine);
        if (filterLine === 'weekly') setChartDataLine(weeklyDataLine);
        if (filterLine === 'monthly') setChartDataLine(monthlyDataLine);
    };

    // Biểu đồ khí thải
    const handleFilterChangeExhaust = (filterExhaust) => {
        setSelectedFilterExhaust(filterExhaust);

        if (filterExhaust === 'daily') setChartDataExhaust(dailyDataExhaust);
        if (filterExhaust === 'weekly') setChartDataExhaust(weeklyDataExhaust);
        if (filterExhaust === 'monthly') setChartDataExhaust(monthlyDataExhaust);
    };
    // Biểu đồ độ ẩm
    const handleFilterChangeRoom = (filterRoom) => {
        setSelectedFilterRoom(filterRoom);

        if (filterRoom === 'daily') setChartDataRoom(dailyDataRoom);
        if (filterRoom === 'weekly') setChartDataRoom(weeklyDataRoom);
        if (filterRoom === 'monthly') setChartDataRoom(monthlyDataRoom);
    };

    const handleAddDevice = () => {
        setCurrentDevice(null);
        setShowForm(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const selectedDeviceId = parseInt(formData.get('deviceSelect'), 10);
        const selectedDevice = availableDevices.find((device) => device.id === selectedDeviceId);

        if (selectedDevice) {
            const newDevice = { ...selectedDevice };
            setDevices((prevDevices) => [...prevDevices, newDevice]);
            setShowForm(false);
        }
    };

    const handleDeleteDevice = (id) => {
        setDevices((prevDevices) => prevDevices.filter((device) => device.id !== id));
    };

    const handleToggleStatus = (id) => {
        setDevices((prevDevices) =>
            prevDevices.map((device) =>
                device.id === id ? { ...device, status: !device.status } : device
            )
        );
    };

    // Kiểm tra nếu có thiết bị "Máy bơm" trong danh sách
    const hasPumpDevice = devices.some(device => device.name === 'Máy bơm');

    // Kiểm tra nếu có thiết bị "Máy lạnh" trong danh sách
    const hasAirConditioner = devices.some((device) => device.name === 'Máy lạnh');

    // Kiểm tra nếu có thiết bị "Máy lạnh" trong danh sách
    const hasExhaust = devices.some((device) => device.name === 'Cảm biến khí');


    const { location } = useParams(); // Retrieve the dynamic location parameter

    // Replace the hardcoded `regionName`
    const regionName = location;

    return (
        <div className="deviceRegion">
            <div className="title-device h1-bold">Quản lý thiết bị khu vực</div>
    
            {/* Breadcrumb */}
            <div className="breadcrumb" style={{ display: 'flex', alignItems: 'center', paddingTop: '0.75em', paddingBottom: '1.5em' }}>
                <Link to="/regions">
                <span className="body1-regular">Quản lý khu vực</span>
                </Link>
                <CaretRight size="1em" style={{ margin: '0 0.625em' }} />
                <span className="body1-regular">{regionName}</span>
            </div>

            <div className='regionDeviceContent'>
                <BackButton/>                
                <button className="add-button" onClick={handleAddDevice}>
                    <span className="button-text">Thêm</span>
                    <Plus className="button-icon" />
                </button>
                
            </div>
            <div className="device-list">
                <table className="device-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên thiết bị</th>
                            <th>Trạng thái</th>
                            <th>Điều khiển</th>
                            <th>Lịch sử tiêu thụ điện</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map((device) => (
                            <tr key={device.id} >
                                <td>{device.id}</td>
                                <td>{device.name}</td>
                                <td>{device.status ? 'Hoạt động' : 'Không hoạt động'}</td>
                                <td>
                                    <div className='toggle-button-wrapper'>
                                        <ToggleButton
                                            isOn={device.status}
                                            onToggle={() => handleToggleStatus(device.id)}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <a
                                        href={`/devices/consumption/${device.id}`}
                                        className="view-more-link"
                                    >
                                        Xem lịch sử
                                    </a>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteDevice(device.id)}>
                                        <Trash className="icon-trash" size="1.25em" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <div className="form-overlay">
                    <form className="add-device-form" onSubmit={handleFormSubmit}>
                        <h3>Thêm thiết bị</h3>
                        <label>
                            Chọn thiết bị:
                            <select name="deviceSelect" required>
                                <option value="">-- Chọn thiết bị --</option>
                                {availableDevices.map((device) => (
                                    <option key={device.id} value={device.id}>
                                        {device.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <div className="form-buttons">
                            <button type="submit">Thêm</button>
                            <button type="button" onClick={() => setShowForm(false)}>
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            )}
            
            {/* Hiển thị sân vườn nếu có thiết bị "Máy bơm" */}
            {hasPumpDevice && (
                <div className='garden' style={{marginTop:'2em'}}>
                    <div className='h2-bold gardenTitle' style={{ textAlign: "center"}}>Sân Vườn</div>
                    <GardenTime hour={hour} minute={minute}/>
                    <div className='gardenContent'>
                        <div className='body3-regular' style={{display:"flex", alignItems:'center', gap:'0.625em'}}>
                            Tổng quan dữ liệu theo:
                            <FilterDropdownLine selectedFilterLine={selectedFilterLine} onFilterChangeLine={handleFilterChangeLine} />
                        </div>
                        {/* Biểu đồ */}
                        <GardenChart selectedFilterLine={selectedFilterLine} chartDataLine={chartDataLine} labelsLine={labelsLine} />
                        <div className='body1-regular' style={{display:'flex', justifyContent:'center'}}>Biểu đồ trung bình độ ẩm đất</div>
                    </div>
                </div>
            )}
            
                       
            {hasAirConditioner && (
                <div className='condition' style={{ marginTop: '2em' }}>
                    <Tempurature />
                    <div className='gardenContent'>
                        <div className='body3-regular' style={{ display: 'flex', alignItems: 'center', gap: '0.625em' }}>
                            Tổng quan dữ liệu theo:
                            <FilterDropdownRoom
                                selectedFilterRoom={selectedFilterRoom}
                                onFilterChangeRoom={handleFilterChangeRoom}
                            />
                        </div>
                        {/* Biểu đồ */}
                        <ConditionChart
                            selectedFilterRoom={selectedFilterRoom}
                            chartDataRoom={chartDataRoom}
                            labelsRoom={labelsRoom}
                        />
                        <span
                            className='body1-regular'
                            style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5em' }}
                        >
                            Biểu đồ độ ẩm phòng trung bình
                        </span>
                    </div>
                </div>
            )}

            {hasExhaust && (
                <div className='exhaust' style={{ marginTop: '2em' }}>
                    <div className='h2-bold gardenTitle' style={{ textAlign: "center"}}>Biểu đồ mức độ khí thải</div>
                    <div className='body3-regular' style={{ display: 'flex', alignItems: 'center', gap: '0.625em', justifyContent:'flex-end'}}>
                        Tổng quan dữ liệu theo:
                        <FilterDropdownExhaust
                            selectedFilterExhaust={selectedFilterExhaust}
                            onFilterChangeExhaust={handleFilterChangeExhaust}
                        />
                    </div>
                    {/* Biểu đồ */}
                    <ExhaustChart
                        selectedFilterExhaust={selectedFilterExhaust}
                        chartDataExhaust={chartDataExhaust}
                        labelsExhaust={labelsExhaust}
                    />
                </div>
            )}

        </div>
    );
};

export default DeviceRegion;
