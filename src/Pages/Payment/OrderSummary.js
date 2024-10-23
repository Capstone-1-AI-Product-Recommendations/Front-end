/** @format */
import React, { useState } from "react";
import "./OrderSummary.css"; // Ensure the CSS file is correctly imported

const OrderSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState("directBank");
  const [shippingMethod, setShippingMethod] = useState("flat");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order placed:", {
      paymentMethod,
      shippingMethod,
      acceptTerms,
    });
  };

  return (
    <div className='payment-info'>
      <div className='order-summary'>
        <h2>Đơn hàng của bạn</h2>

        <div className='product-details'>
          <div className='product-row'>
            <span>Chuối Hữu Cơ Tươi Marketside, Bó × 1</span>
            <span>$0.89</span>
          </div>

          <div className='subtotal-row'>
            <span>Tổng phụ</span>
            <span>$0.89</span>
          </div>
        </div>

        <div className='shipping-options'>
          <h3>Vận chuyển:</h3>
          <label>
            <input
              type='radio'
              name='shipping'
              value='flat'
              checked={shippingMethod === "flat"}
              onChange={(e) => setShippingMethod(e.target.value)}
            />
            <span>Giá cố định: $15.00</span>
          </label>

          <label>
            <input
              type='radio'
              name='shipping'
              value='pickup'
              checked={shippingMethod === "pickup"}
              onChange={(e) => setShippingMethod(e.target.value)}
            />
            <span>Nhận hàng tại chỗ</span>
          </label>
        </div>

        <div className='total-row'>
          <span>Tổng cộng</span>
          <span>$15.89</span>
        </div>

        <div className='payment-methods'>
          <label>
            <input
              type='radio'
              name='paymentMethod'
              value='directBank'
              checked={paymentMethod === "directBank"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Chuyển khoản ngân hàng trực tiếp</span>
          </label>

          {paymentMethod === "directBank" && (
            <p className='payment-note'>
              Hãy chuyển khoản thanh toán trực tiếp vào tài khoản ngân hàng của
              chúng tôi. Vui lòng sử dụng Mã Đơn Hàng của bạn làm tham chiếu
              thanh toán. Đơn hàng của bạn sẽ không được gửi cho đến khi chúng
              tôi nhận được tiền trong tài khoản.
            </p>
          )}

          <label>
            <input
              type='radio'
              name='paymentMethod'
              value='check'
              checked={paymentMethod === "check"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Thanh toán bằng séc</span>
          </label>

          <label>
            <input
              type='radio'
              name='paymentMethod'
              value='cash'
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Thanh toán khi nhận hàng</span>
          </label>
        </div>

        <div className='privacy-notice'>
          Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, hỗ trợ trải
          nghiệm của bạn trên trang web này, và cho các mục đích khác được mô tả
          trong chính sách quyền riêng tư của chúng tôi.
        </div>

        <div className='terms-checkbox'>
          <label>
            <input
              type='checkbox'
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              required
            />
            <span>
              Tôi đã đọc và đồng ý với{" "}
              <a href='#' className='terms-link'>
                điều khoản và điều kiện
              </a>{" "}
              của trang web *
            </span>
          </label>
        </div>

        <button
          className='place-order-btn'
          disabled={!acceptTerms}
          onClick={handleSubmit}
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
