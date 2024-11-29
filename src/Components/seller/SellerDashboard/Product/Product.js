import React from 'react';
import './Product.css';
import { FaThList, FaThLarge } from 'react-icons/fa';
// import errorIcon fprm "../../../img/productBanner.png";

const Product = () => {
    return (
        <div className="product-management">
            <div className="header">
                <h2>Sản phẩm</h2>
                <div className="tabs">
                    <span className="tab active">Tất cả</span>
                    <span className="tab">Đang hoạt động (0)</span>
                    <span className="tab">Vi phạm (0)</span>
                    <span className="tab">Chờ duyệt bởi Shopee (0)</span>
                    <span className="tab">Chưa được đăng (0)</span>
                </div>
            </div>
            
            <div className="controls">
                <button className="control-button">Cài đặt sản phẩm</button>
                <button className="control-button">Công cụ xử lý hàng loạt</button>
                <button className="add-button">+ Thêm 1 sản phẩm mới</button>
            </div>
            
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Tìm Tên sản phẩm, SKU sản phẩm, SKU phân loại, Mã sản phẩm" 
                    className="search-input"
                />
                <input 
                    type="text" 
                    placeholder="Tìm kiếm theo ngành hàng" 
                    className="category-input"
                />
                <button className="apply-button">Áp dụng</button>
                <button className="reset-button">Nhập Lại</button>
                <div className="view-toggle">
                    <FaThList className="icon" />
                    <FaThLarge className="icon" />
                </div>
            </div>

            <div className="product-list">
                <p className="no-products">0 Sản Phẩm</p>
                <p className="limit">Hạn mức đăng bán: 1000</p>
                <div className="product-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th>Doanh số</th>
                                <th>Giá</th>
                                <th>Kho hàng</th>
                                <th>Chất Lượng Nội Dung</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            <tr>
                                <td colSpan="6" className="empty">
                                    <img src={errorIcon} alt="No products" />
                                    <p>Không tìm thấy sản phẩm</p>
                                </td>
                            </tr>
                        </tbody> */}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Product;
