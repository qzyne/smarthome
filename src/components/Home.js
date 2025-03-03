import React, { useState, useEffect } from "react";
import "../css/Home.css";
import Tempurature from "../components/Tempurature";
import FilterDropdown from "./FilterDropdown";
import FilterDropdownLine from "../components/Garden/FilterDropdownLine";
import BarChartFrequency from "../components/BarChartFrequency";
import { CaretRight } from "phosphor-react";
import GardenTime from "../components/Garden/GardenTime";
import GardenChart from "../components/Garden/GardenChart";
import DeviceHome from "./DeviceHome";
import { getAllRooms } from "../services/RoomService";
import { getTotalEnergy } from "../services/PowerDeviceService";
// import { useNavigate } from "react-router-dom";
const Home = () => {
  // tần suất tiểu thụ điện
  // const navigate = useNavigate();
  const dailyData = [10, 15, 8, 12, 20, 25, 18];
  const weeklyData = [50, 70, 55, 80, 65];
  const monthlyData = [300, 400, 320];
  // Độ ẩm đất
  const dailyDataLine = [10, 15, 8, 12, 20, 25, 18];
  const weeklyDataLine = [50, 70, 55, 80, 65];
  const monthlyDataLine = [50, 40, 30];

  // State quản lý bộ lọc và dữ liệu
  const [selectedFilter, setSelectedFilter] = useState("daily");
  const [selectedFilterLine, setSelectedFilterLine] = useState("daily");
  const [chartData, setChartData] = useState(dailyData);
  const [chartDataLine, setChartDataLine] = useState(dailyDataLine);

  const time = "Tối (18h - 24h)";

  // Xử lý thay đổi bộ lọc
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);

    if (filter === "daily") setChartData(dailyData);
    if (filter === "weekly") setChartData(weeklyData);
    if (filter === "monthly") setChartData(monthlyData);
  };
  // Biểu đồ độ ẩm
  const handleFilterChangeLine = (filterLine) => {
    setSelectedFilterLine(filterLine);

    if (filterLine === "daily") setChartDataLine(dailyDataLine);
    if (filterLine === "weekly") setChartDataLine(weeklyDataLine);
    if (filterLine === "monthly") setChartDataLine(monthlyDataLine);
  };

  // Dữ liệu nhãn (labels) bar chart
  const labels = {
    daily: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"],
    weekly: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
    monthly: ["Tháng 1", "Tháng 2", "Tháng 3"],
  };
  // label của Line chart
  const labelsLine = {
    daily: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"],
    weekly: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
    monthly: ["Tháng 1", "Tháng 2", "Tháng 3"],
  };

  // const [roomCount, setRoomCount] = useState(5);
  const [totalEnergyUsage, setTotalEnergyUsage] = useState(0);
  const [listRoom, setListRoom] = useState([]);
  useEffect(() => {
    getRooms();
  }, [listRoom]);
  const getRooms = async () => {
    let res = await getAllRooms();
    if (res && res.data) {
      setListRoom(res.data);
    }
  };
  useEffect(() => {
    getTotalEnergyUsing();
  }, [totalEnergyUsage]);

  const getTotalEnergyUsing = async () => {
    let res = await getTotalEnergy();
    if (res.status === 200 && res.data) {
      setTotalEnergyUsage(res.data);
    }
  };
  const hour = 16;
  const minute = 22;

  return (
    <div className="home">
      {/* Nhiệt độ phòng */}
      <Tempurature />

      {/* Biểu đồ tần suất sử dụng điện */}
      <div className="chart">
        <div className="h2-bold" style={{ textAlign: "center" }}>
          Tần suất sử dụng điện
        </div>
        <div className="title-electric">
          <div
            className="body1-bold"
            style={{
              color: "var(--bold-brown)",
              display: "flex",
              alignItems: "center",
              gap: "0.625em",
            }}
          >
            Tổng điện tiêu thụ:
            <span style={{ color: "var(--primary-color)" }}>
              {totalEnergyUsage} kWh
            </span>
          </div>

          <div
            className="body3-regular"
            style={{ display: "flex", alignItems: "center", gap: "0.625em" }}
          >
            Tổng quan dữ liệu theo:
            <FilterDropdown
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        <div
          className="body1-bold"
          style={{
            color: "var(--bold-brown)",
            display: "flex",
            alignItems: "center",
            gap: "0.625em",
            marginTop: "0.75em",
          }}
        >
          Khung giờ tiêu thụ nhiều:
          <span style={{ color: "var(--primary-color)" }}>{time}</span>
        </div>

        <div className="chartBar">
          {/* Biểu đồ */}
          <BarChartFrequency
            selectedFilter={selectedFilter}
            chartData={chartData}
            labels={labels}
          />
        </div>
      </div>

      {/* Khu Vực */}
      <div className="region-home">
        <div
          className="h2-bold"
          style={{ textAlign: "center", paddingBottom: "1.25em" }}
        >
          Khu vực
        </div>
        <div>
          {/* Tạo danh sách phòng trực tiếp */}
          {listRoom &&
            listRoom.length > 0 &&
            listRoom.map((item, index) => {
              return (
                <a
                  key={index + 1}
                  className="room"
                  // onClick={getRoomDevicesPage(item.id)}
                  href={`/regions/regionDeviceManagement/${item.id}`}
                >
                  <div className="body2-bold">
                    {item.roomName} <br />
                    <span
                      className="note"
                      style={{ color: "var(--bold-brown)" }}
                    >
                      {" "}
                      {item.amountOfDevice} Thiết bị{" "}
                    </span>
                  </div>
                  <CaretRight />
                </a>
              );
            })}
        </div>
      </div>

      {/* Sân vườn*/}
      <div className="garden">
        <div className="h2-bold gardenTitle" style={{ textAlign: "center" }}>
          Sân Vườn
        </div>
        <GardenTime hour={hour} minute={minute} />
        <div className="gardenContent">
          <div
            className="body3-regular"
            style={{ display: "flex", alignItems: "center", gap: "0.625em" }}
          >
            Tổng quan dữ liệu theo:
            <FilterDropdownLine
              selectedFilterLine={selectedFilterLine}
              onFilterChangeLine={handleFilterChangeLine}
            />
          </div>

          <div className="gardenChart">
            {/* Biểu đồ */}
            <GardenChart
              selectedFilterLine={selectedFilterLine}
              chartDataLine={chartDataLine}
              labelsLine={labelsLine}
            />
          </div>
          <div
            className="body1-regular"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Biểu đồ trung bình độ ẩm đất
          </div>
        </div>
      </div>
      <DeviceHome className="device-home" />
    </div>
  );
};

export default Home;
