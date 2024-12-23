import React from 'react';
import './HeaderSeller.css';
import { FaChevronRight, FaTh, FaUserCircle } from 'react-icons/fa';
import logoApp from '../../../../img/logoApp.png';

const HeaderSeller = () => {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve user object from local storage
    const username = user ? user.full_name : null; 
    console.log(username);
    return (
        <div className="header">
            <div className="header-left">
                <img 
                    src={logoApp} // Replace with actual Shopee logo path
                    alt="Shopee Logo"
                    className="logo"
                />
                <span className="breadcrumb">Trang chủ</span>
                <FaChevronRight className="breadcrumb-icon" />
                <span className="breadcrumb">Sản phẩm</span>
            </div>
            <div className="header-right">
                <FaTh className="icon" />
                <FaUserCircle className="icon user-icon" />
                <span className="username">{username}</span>
                <FaChevronRight className="dropdown-icon" />
            </div>
        </div>
    );
};

export default HeaderSeller;
