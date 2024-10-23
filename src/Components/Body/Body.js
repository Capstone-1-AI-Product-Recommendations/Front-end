/** @format */

// src/Components/Body.js

import React from "react";
import "./Body.scss"; // Import CSS styles

const Body = () => {
  return (
      <div className="container-fluid">
          <div className="row">
              <div className="col-md-3 bg-white p-3 sidebar">
                  <ul className="nav flex-column">
                      <li className="nav-item"><i className="fas fa-th-large mr-2"></i> Tất cả danh mục</li>
                      <li className="nav-item"><i className="fas fa-apple-alt mr-2"></i> Trái cây và rau quả</li>
                      <li className="nav-item"><i className="fas fa-laptop mr-2"></i> Máy tính & Laptop</li>
                      <li className="nav-item"><i className="fas fa-clock mr-2"></i> Đồng hồ</li>
                      <li className="nav-item"><i className="fas fa-futbol mr-2"></i> Thể thao</li>
                      <li className="nav-item"><i className="fas fa-gem mr-2"></i> Phụ kiện, trang sức</li>
                      <li className="nav-item"><i className="fas fa-tshirt mr-2"></i> Thời trang nam</li>
                      <li className="nav-item"><i className="fas fa-child mr-2"></i> Đồ chơi trẻ em</li>
                      <li className="nav-item"><i className="fas fa-paw mr-2"></i> Thú cưng</li>
                      <li className="nav-item"><i className="fas fa-broom mr-2"></i> Dọn dẹp</li>
                      <li className="nav-item"><i className="fas fa-heart mr-2"></i> Sức khỏe</li>
                      <li className="nav-item"><i className="fas fa-baby mr-2"></i> Đồ chơi trẻ em</li>
                  </ul>
              </div>
              <div className="col-md-9">
                  <div className="p-4 card rounded">
                      <div className="mb-2 text-success">Giảm giá cuối tuần</div>
                      <h2>Nhận được sản phẩm chất lượng tốt nhất với mức giá thấp nhất</h2>
                      <p>Chúng tôi đã chuẩn bị các chương trình giảm giá đặc biệt cho bạn đối với các sản phẩm tạp hóa. Đừng bỏ lỡ những cơ hội này...</p>
                      <button className="btn btn-primary">Mua ngay</button>
                      <span className="h4 text-danger ml-3">$27.99</span>
                      <span className="text-muted"><del>$56.67</del></span>
                      <div className="mt-2 text-secondary small">Đừng bỏ lỡ ưu đãi có thời hạn này.</div>
                  </div>
                  <div className="mt-3">
                      <img src="https://storage.googleapis.com/a1aa/image/rC3GTudstRpHLJhBMeuPR9YGtNzYSSEnAgwTxIuybrOMUHzJA.jpg" alt="Promotional image of a shoe with city background" className="img-fluid rounded"/>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Body;
