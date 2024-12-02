export const ShippingData = [
  {
    id: 1,
    name: "Nhanh",
    price: 32700,
    estimatedDelivery: "4 Tháng 12 - 5 Tháng 12",
    voucherNote: "Nhận Voucher trị giá ₫15.000 nếu đơn hàng được giao đến bạn sau ngày 5 Tháng 12 2024."
  },
  {
    id: 2,
    name: "Tiết kiệm",
    price: 20250,
    estimatedDelivery: "3 Tháng 12 - 6 Tháng 12",
    voucherNote: "Nhận Voucher trị giá ₫15.000 nếu đơn hàng được giao đến bạn sau ngày 6 Tháng 12 2024."
  }
];

// Thêm hàm format giá nếu cần
export const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}; 