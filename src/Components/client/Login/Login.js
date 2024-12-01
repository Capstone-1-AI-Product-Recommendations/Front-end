/** @format */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

const Login = ({ onClose, onLoginSuccess, onRegisterClick }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Update form state on input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrorMessage("");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const accounts = {
      admin: { email: "admin@gmail.com", password: "123456" },
      seller: { email: "seller@gmail.com", password: "123456" },
      user: { email: "user@gmail.com", password: "123456" },
    };

    if (
      formData.email === accounts.admin.email &&
      formData.password === accounts.admin.password
    ) {
      onLoginSuccess("admin");
      onClose();
    } else if (
      formData.email === accounts.seller.email &&
      formData.password === accounts.seller.password
    ) {
      onLoginSuccess("seller");
      onClose();
    } else if (
      formData.email === accounts.user.email &&
      formData.password === accounts.user.password
    ) {
      onLoginSuccess("user");
      onClose();
    } else {
      setErrorMessage("Email hoặc mật khẩu không chính xác.");
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    onLoginSuccess("user");
    onClose();
    navigate("/");
  };

  const handleGoogleLoginFailure = () => {
    setErrorMessage("Đăng nhập bằng Google thất bại.");
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        {/* Close button */}
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close login modal"
          role="button"
        >
          ×
        </button>

        <h1>Xin chào bạn mới</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
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

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Ghi nhớ đăng nhập
            </label>
            <a href="/forgot-password" className="forgot-password">
              Quên mật khẩu?
            </a>
          </div>

          <button type="submit" className="primary-button">
            Đăng nhập
          </button>
        </form>

        <div className="divider">Hoặc</div>

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
        />

        <p className="switch-auth">
          Chưa có tài khoản?{" "}
          <span className="link-register" onClick={onRegisterClick}>
            Đăng ký
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;








// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import { loginUser, loginWithGoogle } from "../../../services/apiLogin";
// import "./Login.css";

// const Login = ({ onClose, onLoginSuccess, onRegisterClick }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     setErrorMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorMessage("");

//     try {
//       const response = await loginUser({
//         email: formData.email,
//         password: formData.password,
//       });

//       // Xử lý response theo role
//       const userRole = response.user.role || 'user';
//       onLoginSuccess(userRole);
//       onClose();
//       navigate("/");
//     } catch (error) {
//       setErrorMessage(error.message || "Đăng nhập thất bại. Vui lòng thử lại.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleLoginSuccess = async (response) => {
//     setIsLoading(true);
//     setErrorMessage("");

//     try {
//       const result = await loginWithGoogle(response);
//       const userRole = result.user.role || 'user';
//       onLoginSuccess(userRole);
//       onClose();
//       navigate("/");
//     } catch (error) {
//       setErrorMessage(error.message || "Đăng nhập Google thất bại. Vui lòng thử lại.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleLoginFailure = () => {
//     setErrorMessage("Đăng nhập bằng Google thất bại.");
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-form">
//         <button className="close-btn" onClick={onClose}>×</button>
//         <h1>Xin chào bạn mới</h1>
        
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
        
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="example@gmail.com"
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

//           <div className="form-options">
//             <label className="remember-me">
//               <input
//                 type="checkbox"
//                 name="rememberMe"
//                 checked={formData.rememberMe}
//                 onChange={handleChange}
//                 disabled={isLoading}
//               />
//               Ghi nhớ đăng nhập
//             </label>
//             <a href="/forgot-password" className="forgot-password">
//               Quên mật khẩu?
//             </a>
//           </div>

//           <button type="submit" className="primary-button" disabled={isLoading}>
//             {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
//           </button>
//         </form>

//         <div className="divider">Hoặc</div>

//         <GoogleLogin
//           onSuccess={handleGoogleLoginSuccess}
//           onError={handleGoogleLoginFailure}
//           disabled={isLoading}
//         />

//         <p className="switch-auth">
//           Chưa có tài khoản?{" "}
//           <span className="link-register" onClick={onRegisterClick}>
//             Đăng ký
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;