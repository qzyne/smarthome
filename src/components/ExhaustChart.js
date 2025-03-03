import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,  // Đăng ký CategoryScale cho trục X
    LinearScale,    // Đăng ký LinearScale cho trục Y
    BarElement,     // Đăng ký BarElement để vẽ biểu đồ cột
    Tooltip,        // Đăng ký Tooltip để hiển thị tooltip
    Legend          // Đăng ký Legend để hiển thị chú giải
);

const ExhaustChart = ({ selectedFilterExhaust, chartDataExhaust, labelsExhaust }) => {
    // Danh sách các nhãn khí thải
    const exhaustLabels = ["Metan", "Khói", "Gas"];
    
    // Xử lý dữ liệu thành từng loại khí thải theo ngày
    const datasets = chartDataExhaust[0].map((_, index) => ({
        label: exhaustLabels[index], // Sử dụng nhãn tùy chỉnh
        data: chartDataExhaust.map((day) => day[index]), // Lấy giá trị từng cột theo ngày
        backgroundColor: ['#D671BE', '#8127D6', '#65B9FF'][index], // Màu sắc cột
    }));

    return (
        <Bar
            data={{
                labels: labelsExhaust[selectedFilterExhaust], // Nhãn (ngày hoặc tuần hoặc tháng)
                datasets, // Bộ dữ liệu đã xử lý
            }}
            options={{
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                },
            }}
        />
    );
};

export default ExhaustChart;
