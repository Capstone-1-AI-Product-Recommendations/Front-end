import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import './SidebarSeller.css';
import { FaHome, FaBoxes, FaShoppingCart, FaWarehouse, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import menuSellerItems from '../../../../data/menuSellerItems';

const SidebarSeller = () => {
    const [activeItem, setActiveItem] = useState('dashboard');

    return (
        <div className="sidebar-seller">
            <div className="sidebar-content">
                <nav>
                    <ul className="nav-list">
                        {menuSellerItems.map((item) => (
                            <li key={item.id} className={activeItem === item.id ? 'active' : ''}>
                                <Link to={item.path} onClick={() => setActiveItem(item.id)}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SidebarSeller;
