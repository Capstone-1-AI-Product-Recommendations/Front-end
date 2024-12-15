//Register.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { GoogleLogin } from "@react-oauth/google";
import { registerUser } from "../../../services/apiLogin";

const Register = ({ onClose, onLoginClick }) => { 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      console.log('User registered successfully:', data);
      onLoginClick();
      // Handle successful registration (e.g., open login modal)
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle registration error (e.g., show error message)
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google login success:", response);
    navigate('/');
    if (onClose) onClose();
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h1>Tạo tài khoản</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Tên người dùng</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nhập tên người dùng"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Nhập email của bạn"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu của bạn"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="primary-button">
            Đăng ký
          </button>
        </form>
        <div className="divider">Hoặc</div>
        <GoogleLogin onSuccess={handleGoogleLoginSuccess} />
        <p className="switch-auth">
          Đã có tài khoản?{" "}
          <span className="link-login" onClick={onLoginClick}>
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import { registerUser, registerWithGoogle } from "../../../services/apiLogin";
// import "./Register.css";

// const Register = ({ onClose, onLoginClick }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setErrorMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorMessage("");

//     try {
//       const response = await registerUser(formData);
//       // Nếu đăng ký thành công, chuyển đến trang đăng ký homepage
//       navigate('/');
//       if (onClose) onClose();
//     } catch (error) {
//       setErrorMessage(
//         error.message || 
//         "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleLoginSuccess = async (response) => {
//     setIsLoading(true);
//     setErrorMessage("");

//     try {
//       const result = await registerWithGoogle(response);
//       // Sau khi đăng ký Google thành công
//       navigate('/register-seller');
//       if (onClose) onClose();
//     } catch (error) {
//       setErrorMessage(
//         error.message || 
//         "Đăng ký bằng Google thất bại. Vui lòng thử lại."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleLoginFailure = () => {
//     setErrorMessage("Đăng ký bằng Google thất bại.");
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-form">
//         <button className="close-btn" onClick={onClose}>
//           ×
//         </button>
//         <h1>Tạo tài khoản</h1>
        
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
        
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="username">Tên người dùng</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               placeholder="Nhập tên người dùng"
//               value={formData.username}
//               onChange={handleChange}
//               disabled={isLoading}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Nhập email của bạn"
//               value={formData.email}
//               onChange={handleChange}
//               disabled={isLoading}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Mật khẩu</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Nhập mật khẩu của bạn"
//               value={formData.password}
//               onChange={handleChange}
//               disabled={isLoading}
//             />
//           </div>
//           <button type="submit" className="primary-button" disabled={isLoading}>
//             {isLoading ? "Đang đăng ký..." : "Đăng ký"}
//           </button>
//         </form>

//         <div className="divider">Hoặc</div>

//         <GoogleLogin
//           onSuccess={handleGoogleLoginSuccess}
//           onError={handleGoogleLoginFailure}
//           disabled={isLoading}
//         />

//         <p className="switch-auth">
//           Đã có tài khoản?{" "}
//           <span className="link-login" onClick={onLoginClick}>
//             Đăng nhập
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;