import React from 'react';
import './HeaderSeller.css';
import { FaChevronRight, FaTh, FaUserCircle } from 'react-icons/fa';
import logoApp from '../../../../img/logoApp.png';

const HeaderSeller = () => {
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
                <span className="username">minhmanh2709</span>
                <FaChevronRight className="dropdown-icon" />
            </div>
        </div>
    );
};

export default HeaderSeller;
