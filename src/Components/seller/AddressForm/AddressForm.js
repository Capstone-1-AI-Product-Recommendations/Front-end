// import React, { useState } from 'react';
// import "./AddressForm.css";
// import { useNavigate } from "react-router-dom";

// const AddressForm = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [province, setProvince] = useState('');
//   const [district, setDistrict] = useState('');
//   const [ward, setWard] = useState('');
//   const [address, setAddress] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Xử lý dữ liệu địa chỉ và gửi đi
//     console.log({
//       phoneNumber,
//       province,
//       district,
//       ward,
//       address
//     });
//   };

//   const navigate = useNavigate();
//   const handleNext = () => {
//     navigate("/shipping");
//     // Thêm logic điều hướng về trang chủ nếu cần
//   };
//   // const handleNext = () => {
//   //   navigate("/shipping");
//   //   // Thêm logic điều hướng về trang chủ nếu cần


//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="phoneNumber">Số điện thoại</label>
//         <input
//           type="text"
//           id="phoneNumber"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="province">Tỉnh/Thành phố</label>
//         <select
//           id="province"
//           value={province}
//           onChange={(e) => setProvince(e.target.value)}
//           required
//         >
//           <option value="">Chọn Tỉnh/Thành phố</option>
//           {/* Thêm các tùy chọn Tỉnh/Thành phố vào đây */}
//         </select>
//       </div>
//       <div className="form-group">
//         <label htmlFor="district">Quận/Huyện</label>
//         <select
//           id="district"
//           value={district}
//           onChange={(e) => setDistrict(e.target.value)}
//           required
//         >
//           <option value="">Chọn Quận/Huyện</option>
//           {/* Thêm các tùy chọn Quận/Huyện vào đây */}
//         </select>
//       </div>
//       <div className="form-group">
//         <label htmlFor="ward">Phường/Xã</label>
//         <select
//           id="ward"
//           value={ward}
//           onChange={(e) => setWard(e.target.value)}
//           required
//         >
//           <option value="">Chọn Phường/Xã</option>
//           {/* Thêm các tùy chọn Phường/Xã vào đây */}
//         </select>
//       </div>
//       <div className="form-group">
//         <label htmlFor="address">Địa chỉ cụ thể</label>
//         <textarea
//           id="address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           required
//         ></textarea>
//       </div>
//       <button type="submit" className="btn-submit">
//         Tiếp theo
//       </button>
//     </form>
//   );
// };
// export default AddressForm;