import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SidebarSeller.css';
import { FaHome, FaBox, FaShoppingCart, FaList, FaNewspaper, FaUser, FaKey } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const SidebarSeller = () => {
    const [activeItem, setActiveItem] = useState('dashboard');

    return (
        <div className="sidebar-seller">
            <div className="sidebar-content">
                <nav>
                    <ul className="nav-list">
                        <li className={activeItem === 'home' ? 'active' : ''}>
                            <Link to="#" onClick={() => setActiveItem('home')}>
                                <FaHome />
                                <span>Trang chủ</span>
                            </Link>
                        </li>
                        <li className={activeItem === 'dashboard' ? 'active' : ''}>
                            <Link to="#" onClick={() => setActiveItem('dashboard')}>
                                <MdDashboard />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-header">Quản Lý Sản Phẩm</li>
                        <li className={activeItem === 'account' ? 'active' : ''}>
                            <Link to="#" onClick={() => setActiveItem('account')}>
                                <FaUser />
                                <span>Tài khoản</span>
                            </Link>
                        </li>
                        <li className={activeItem === 'orders' ? 'active' : ''}>
                            <Link to="#" onClick={() => setActiveItem('orders')}>
                                <FaShoppingCart />
                                <span>Đơn hàng</span>
                            </Link>
                        </li>
                        <li className={activeItem === 'categories' ? 'active' : ''}>
                            <Link to="#" onClick={() => setActiveItem('categories')}>
                                <FaList />
                                <span>Danh mục</span>
                            </Link>
                        </li>
                        <li className={activeItem === 'products' ? 'active' : ''}>
                            <Link to="#" onClick={() => setActiveItem('products')}>
                                <FaBox />
                                <span>Sản phẩm</span>
                            </Link>
                        </li>
                        <li className={activeItem === 'posts' ? 'active' : ''}>
                            <Link to="#" onClick={() => setActiveItem('posts')}>
                                <FaNewspaper />
                                <span>Bài viết</span>
                            </Link>
                        </li>
                        <li className={activeItem === 'profile' ? 'active' : ''}>
                            <Link to="#" onClick={() => setActiveItem('profile')}>
                                <FaUser />
                                <span>Hồ sơ cá nhân</span>
                            </Link>
                        </li>
                        <li className={activeItem === 'password' ? 'active' : ''}>
                            <Link to="#" onClick={() => setActiveItem('password')}>
                                <FaKey />
                                <span>Đổi mật khẩu</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SidebarSeller;
