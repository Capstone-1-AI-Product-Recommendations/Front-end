/** @format */

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutData, formatPrice } from "../../../data/CheckoutData";
import AddressModal from "./AddressModal";
import ShippingModal from './ShippingModal';
import { ShippingData } from '../../../data/ShippingData';
import addressService from '../../../services/addressService';
import orderService from '../../../services/orderService';
import Swal from 'sweetalert2';
import { CartContext } from '../../../context/CartContext'; // Import CartContext
import cartService from '../../../services/cartService';

import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { addressData, shippingData } = CheckoutData;
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(ShippingData[0]);
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem('user'))?.user_id;
  const { updateCartCount } = useContext(CartContext); // Destructure updateCartCount from context

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await addressService.getUserAddresses(userId);        
        setAddresses(response.addresses);
        
        // Save addresses to localStorage
        localStorage.setItem('userAddresses', JSON.stringify(response.addresses));
        
        // Set default address if exists
        const defaultAddress = response.addresses.find(addr => addr.is_default);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
          localStorage.setItem('selectedAddress', JSON.stringify(defaultAddress));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setLoading(false);
      }
    };

    // Try to get addresses from localStorage first
    const cachedAddresses = localStorage.getItem('userAddresses');
    const cachedSelectedAddress = localStorage.getItem('selectedAddress');
    
    if (cachedAddresses && cachedSelectedAddress) {
      setAddresses(JSON.parse(cachedAddresses));
      setSelectedAddress(JSON.parse(cachedSelectedAddress));
      setLoading(false);
    } else if (userId) {
      fetchAddresses();
    }
  }, [userId]);

  // Get products from localStorage with safe fallback
  const checkoutProducts = JSON.parse(localStorage.getItem('checkoutProducts') || '[]');

  const handleAddressChange = (newAddress) => {
    setSelectedAddress(newAddress);
    setShowAddressModal(false);
  };

  const handleShippingChange = (newShipping) => {
    setSelectedShipping(newShipping);
  };

  const handleOrder = async () => {
    try {
      const cartItemIds = checkoutProducts.reduce((ids, shop) => {
        const shopItemIds = shop.products.map(product => product.cart_item_id);
        return [...ids, ...shopItemIds];
      }, []);

      const orderResponse = await orderService.createOrder(userId, cartItemIds);
      const orderId = orderResponse.order_id;

      if (selectedPayment === 'cod') {
        await orderService.processCODPayment(
          userId,
          orderId,
          selectedAddress.id,
          calculateTotal()
        );

        // Clear checkout data
        localStorage.removeItem('checkoutProducts');

        // Update cart count
        const updatedCartData = await cartService.getCart(userId);
        updateCartCount(updatedCartData);

        // Dispatch cartUpdated event
        window.dispatchEvent(new Event('cartUpdated'));

        // Show success popup
        await Swal.fire({
          title: 'Đặt hàng thành công!',
          text: 'Cảm ơn bạn đã mua hàng.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // Navigate home and reload
        window.location.href = '/';
      } else if (selectedPayment === 'qrcode') {
        const paymentResponse = await orderService.processPayOSPayment(
          userId, 
          orderId,
          selectedAddress.id,
          calculateTotal()
        );

        console.log('Payment URL:', paymentResponse.payment_url);

        // Clear checkout data
        localStorage.removeItem('checkoutProducts');

        // Update cart count
        const updatedCartData = await cartService.getCart(userId);
        updateCartCount(updatedCartData);

        // Dispatch cartUpdated event
        window.dispatchEvent(new Event('cartUpdated'));

        // Navigate with payment URL in state
        navigate('/payment', {
          state: {
            paymentUrl: paymentResponse.payment_url,
            orderId: orderId
          },
          replace: true  // Use replace to avoid navigation issues
        });
      }
    } catch (error) {
      console.error('Error processing order:', error);
      Swal.fire({
        title: 'Lỗi',
        text: 'Có lỗi xảy ra khi xử lý đơn hàng',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const calculateSubTotal = () => {
    return checkoutProducts.reduce((total, shop) => {
      const shopTotal = shop.products.reduce((productTotal, item) => {
        const price = parseFloat(item.product_price) || 0;
        const quantity = parseInt(item.quantity) || 0;
        return productTotal + (price * quantity);
      }, 0);
      return total + shopTotal;
    }, 0);
  };

  const calculateTotal = () => {
    const subTotal = calculateSubTotal();
    const shippingCost = selectedShipping?.price || 0;
    return subTotal + shippingCost;
  };

  return (
    <div className="checkout-container">
      {/* Left Column */}
      <div className="checkout-left">
        <div className="delivery-address">
          <h3>Địa Chỉ Nhận Hàng</h3>
          {loading ? (
            <div>Đang tải...</div>
          ) : (
            
            <div className="address-info">
              <div className="user-details">                
                <span className="name">{selectedAddress?.recipient_name}</span>
                <span className="phone">({selectedAddress?.recipient_phone})</span>
              </div>
              <div className="address-text">
                {selectedAddress?.recipient_address}
              </div>
              <button 
                className="change-btn"
                onClick={() => setShowAddressModal(true)}
              >
                Thay Đổi
              </button>
            </div>
          )}
        </div>

        <AddressModal
          isOpen={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          addresses={addressData}
          onSelectAddress={(address) => {
            setSelectedAddress(address);
            setShowAddressModal(false);
          }}
        />

        <div className="products-section">
          <div className="product-header">
            <span>Sản phẩm</span>
            <span>Đơn giá</span>
            <span>Số lượng</span>
            <span>Thành tiền</span>
          </div>

          {checkoutProducts.map(shop => (
            <div key={shop.shop_id} className="shop-section">
              <div className="shop-header">
                <span>{shop.shop_name}</span>
              </div>
              
              {shop.products.map(item => (
                <div key={item.cart_item_id} className="product-item">
                  <div className="product-info">
                    <img 
                      src={item.product_images?.[0]?.file || ''} 
                      alt={item.product_name} 
                    />
                    <div className="product-details">
                      <span className="product-name">{item.product_name}</span>
                    </div>
                  </div>
                  <div className="product-price">₫{formatPrice(item.product_price)}</div>
                  <div className="product-quantity">{item.quantity}</div>
                  <div className="product-total">
                    ₫{formatPrice(item.product_price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="message-section">
            <span>Lời nhắn:</span>
            <input type="text" placeholder="Lưu ý cho Người bán..." />
          </div>

          <div className="shipping-section">
            <div className="shipping-header">
              <span>Đơn vị vận chuyển:</span>
              <button className="change-btn" onClick={() => setShowShippingModal(true)}>
                THAY ĐỔI
              </button>
            </div>
            
            <div className="shipping-info">
              <div className="shipping-name">
                <span>{selectedShipping.name}</span>
                <span className="shipping-price">{selectedShipping.price.toLocaleString()}₫</span>
              </div>
              <div className="delivery-time">
                Nhận hàng vào {selectedShipping.estimatedDelivery}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="checkout-right">
        <div className="payment-section">
          <h3>Chọn phương thức thanh toán</h3>
          <div className="payment-options">
            <div className="payment-option">
              <input
                type="radio"
                id="qrcode"
                name="payment"
                value="qrcode"
                checked={selectedPayment === 'qrcode'}
                onChange={(e) => setSelectedPayment(e.target.value)}
              />
              <label htmlFor="qrcode">QR Code</label>
            </div>
            
            <div className="payment-option">
              <input
                type="radio"
                id="cod"
                name="payment"
                value="cod"
                checked={selectedPayment === 'cod'}
                onChange={(e) => setSelectedPayment(e.target.value)}
              />
              <label htmlFor="cod">Thanh toán khi nhận hàng</label>
            </div>
          </div>
        </div>

        <div className="order-summary">
          <div className="summary-row">
            <span>Tổng tiền hàng</span>
            <span>₫{formatPrice(calculateSubTotal())}</span>
          </div>
          <div className="summary-row">
            <span>Tổng tiền phí vận chuyển</span>
            <span>₫{(selectedShipping?.price || 0).toLocaleString()}</span>
          </div>
          <div className="summary-row total">
            <span>Tổng thanh toán</span>
            <span className="total-amount">
              ₫{formatPrice(calculateTotal())}
            </span>
          </div>
        </div>

        <button className="order-button" onClick={handleOrder}>
          Đặt Hàng
        </button>
      </div>
      <ShippingModal
        isOpen={showShippingModal}
        onClose={() => setShowShippingModal(false)}
        shippingMethods={ShippingData}
        selectedShipping={selectedShipping}
        onSelectShipping={setSelectedShipping}
      />
    </div>
  );
};

export default Checkout;
