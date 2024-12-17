import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationBanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/seller-dashboard'); // Điều hướng đến seller-dashboard
  };

  return (
    <div style={styles.banner}>
      <p>Chúc mừng bạn đã đăng ký shop thành công!</p>
      <button style={styles.button} onClick={handleClick}>
        Đi đến Trang Quản Lý Shop
      </button>
    </div>
  );
};

const styles = {
  banner: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    position: 'fixed',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
  },
  button: {
    backgroundColor: 'white',
    color: '#4CAF50',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
};

export default NotificationBanner;
