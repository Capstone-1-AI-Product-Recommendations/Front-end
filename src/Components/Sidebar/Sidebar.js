/** @format */

import React from "react";
import {
  FaAppleAlt,
  FaLaptop,
  FaClock,
  FaFutbol,
  FaRing,
  FaTshirt,
  FaChild,
  FaPaw,
  FaSoap,
  FaHeart,
  FaGamepad,
  FaAngleRight,
  FaTh,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='item'>
        <div className='item-content'>
          <FaTh className='icon' />
          <span className='item-text'>Tất cả danh mục</span>
        </div>
        <FaAngleRight className='icon-arrow' />
      </div>
      <div className='item'>
        <div className='item-content'>
          <FaAppleAlt className='icon' />
          <span className='item-text'>Trái cây và rau quả</span>
        </div>
        <FaAngleRight className='icon-arrow' />
      </div>
      <div className='item'>
        <div className='item-content'>
          <FaLaptop className='icon' />
          <span className='item-text'>Máy tính & Laptop</span>
        </div>
        <FaAngleRight className='icon-arrow' />
      </div>
      <div className='item'>
        <div className='item-content'>
          <FaClock className='icon' />
          <span className='item-text'>Đồng hồ</span>
        </div>
        <FaAngleRight className='icon-arrow' />
      </div>
      <div className='item'>
        <div className='item-content'>
          <FaFutbol className='icon' />
          <span className='item-text'>Thể thao</span>
        </div>
        <FaAngleRight className='icon-arrow' />
      </div>
      <div className='item'>
        <div className='item-content'>
          <FaRing className='icon' />
          <span className='item-text'>Phụ kiện, trang sức</span>
        </div>
        <FaAngleRight className='icon-arrow' />
      </div>
      <div className='item'>
        <div className='item-content'>
          <FaTshirt className='icon' />
          <span className='item-text'>Thời trang nam</span>
        </div>
        <FaAngleRight className='icon-arrow' />
      </div>
      <div className='item'>
        <div className='item-content'>
          <FaChild className='icon' />
          <span className='item-text'>Đồ chơi trẻ em</span>
        </div>
        <FaAngleRight className='icon-arrow' />
      </div>
      <div className='item'>
        <div className='item-content'>
          <FaPaw className='icon' />
          <span className='item-text'>Thú cưng</span>
        </div>
        <FaAngleRight className='icon-arrow' />
      </div>
      <div className='item'>
        <div className='item-content'>
          <FaSoap className='icon' />
          <span className='item-text'>Dọn dẹp</span>
        </div>
        <FaAngleRight className='icon-arrow' />
      </div>
      <div className='item'>
        <div className='item-content'>
          <FaHeart className='icon' />
          <span className='item-text'>Sức khỏe</span>
        </div>
        <FaAngleRight className='icon-arrow' />
      </div>
      <div className='item'>
        <div className='item-content'>
          <FaGamepad className='icon' />
          <span className='item-text'>Đồ chơi trẻ em</span>
        </div>
        <FaAngleRight className='icon-arrow' />
      </div>
    </div>
  );
};

export default Sidebar;
