import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li><a href="#">Quản Lý Đơn Hàng</a></li>
                    <ul className="submenu">
                        <li><a href="#">Tất cả</a></li>
                        <li><a href="#">Giao Hàng Loạt</a></li>
                        <li><a href="#">Đơn Trả hàng/Hoàn tiền hoặc Đơn hủy</a></li>
                        <li><a href="#">Cài Đặt Vận Chuyển</a></li>
                        <li><a href="#">Bàn Giao Đơn Hàng</a></li>
                    </ul>
                    <li><a href="#">Quản Lý Sản Phẩm</a></li>
                    <ul className="submenu">
                        <li><a href="#">Tất Cả Sản Phẩm</a></li>
                        <li><a href="#">Thêm Sản Phẩm</a></li>
                    </ul>
                    <li><a href="#">Kênh Marketing</a></li>
                    <ul className="submenu">
                        <li><a href="#">Đấu Giá Rẻ Vô Địch</a></li>
                        <li><a href="#">Quảng Cáo Shopee</a></li>
                        <li><a href="#">Tăng Đơn Cùng KOL</a></li>
                        <li><a href="#">Live & Video</a></li>
                        <li><a href="#">Khuyến Mãi của Shop</a></li>
                        <li><a href="#">Flash Sale Của Shop</a></li>
                        <li><a href="#">Mã Giảm Giá Của Shop</a></li>
                    </ul>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
