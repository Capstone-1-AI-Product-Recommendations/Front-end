import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
<Link to="/product" className={styles.productLink}>Xem Sản Phẩm</Link>
const Home = () => {
    return (
        <div className={styles.container}>           
            {/* Main Content */}
            <div className={styles.mainContainer}>
                {/* Sidebar Filters */}
                <aside className={styles.sidebar}>
                    <h3>Tất cả danh mục</h3>
                    <ul>
                        <li><a href="#">Trái cây và rau củ</a></li>
                        <li><a href="#">Máy tính & Laptop</a></li>
                        <li><a href="#">Đồng hồ</a></li>
                        <li><a href="#">Thể thao</a></li>
                        <li><a href="#">Phụ kiện, trang sức</a></li>
                        <li><a href="#">Thời trang nam</a></li>
                        <li><a href="#">Thời trang nữ</a></li> 
                        <li><a href="#">Đồ chơi trẻ em</a></li>
                        <li><a href="#">Thú cưng</a></li>
                        <li><a href="#">Dọn dẹp</a></li> 
                    </ul>
                </aside>

                {/* Main Shop Section */}
                <section className={styles.shopSection}>
                    {/* Banner Section */}
                    <div className={styles.banner}>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
