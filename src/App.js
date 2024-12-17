import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationBanner from './Components/client/Header/NotificationBanner'; // Import component NotificationBanner
import { CartProvider } from './Components/client/Cart/CartContext';
import { NotificationsProvider } from './Components/client/NotificationsDropdown/NotificationsContext';
import Footer from './Components/client/Footer/Footer';
import RouterCustom from './Router';
import HeaderNoLogin from './Components/client/Header/HeaderNoLogin';
import HeaderAfterLogin from './Components/client/Header/HeaderAfterLogin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Trạng thái để hiển thị NotificationBanner khi role là seller
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập từ localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
      if (user.role === 'seller') {
        setShowSuccessMessage(true); // Nếu role là seller, hiển thị thông báo
      }
    }
  }, []);

  // Hàm đăng nhập thành công
  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('user', JSON.stringify({ role }));
    if (role === 'seller') {
      setShowSuccessMessage(true); // Khi user lên seller thì hiển thị thông báo
    }
    // Điều hướng đến trang chủ ngay lập tức mà không cần reload
    navigate('/');
  };

  // Hàm đăng xuất
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowSuccessMessage(false); // Ẩn thông báo khi đăng xuất
    navigate('/');
  };

  const shouldShowHeader =
    !location.pathname.startsWith('/admin') &&
    !location.pathname.startsWith('/seller-dashboard') &&
    !location.pathname.startsWith('/seller') &&
    !location.pathname.startsWith('/register-seller') &&
    !location.pathname.startsWith('/shipping-setting') &&
    !location.pathname.startsWith('/tax-information') &&
    !location.pathname.startsWith('/identity-information') &&
    !location.pathname.startsWith('/check-registration') &&
    !location.pathname.startsWith('/product-form');

  return (
    <CartProvider>
      <NotificationsProvider>
        {shouldShowHeader && (
          isLoggedIn ? (
            <HeaderAfterLogin onLogout={handleLogout} userRole={userRole} />
          ) : (
            <HeaderNoLogin onLoginSuccess={handleLoginSuccess} />
          )
        )}
        
        {/* Hiển thị bảng thông báo nếu là seller */}
        {showSuccessMessage && <NotificationBanner />}
        
        <RouterCustom 
          isLoggedIn={isLoggedIn} 
          userRole={userRole} 
          onLoginSuccess={handleLoginSuccess} 
        />
        
        {shouldShowHeader && <Footer />}
      </NotificationsProvider>
    </CartProvider>
  );
}

export default App;
