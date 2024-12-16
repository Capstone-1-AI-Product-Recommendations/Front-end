const getDeliveryDates = (shippingType) => {
  const today = new Date();
  const startDate = new Date(today);
  const endDate = new Date(today); 
  // Calculate delivery dates based on shipping type
  if (shippingType === "Nhanh") {
    startDate.setDate(today.getDate() + 3);    
    endDate.setDate(startDate.getDate() + 2); // End date is 2 days after start  
  } else if (shippingType === "Tiết kiệm") {
    startDate.setDate(today.getDate() + 5);
    endDate.setDate(startDate.getDate() + 2); // End date is 2 days after start
  }

  // Format dates in Vietnamese
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day < 10 ? '0' + day : day} Tháng ${month < 10 ? '0' + month : month}`;
  };

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

export const ShippingData = [
  {
    id: 1,
    name: "Nhanh",
    price: 16500,
    estimatedDelivery: getDeliveryDates("Nhanh")
  },
  {
    id: 2,
    name: "Tiết kiệm",
    price: 12000,
    estimatedDelivery: getDeliveryDates("Tiết kiệm")
  }
];

// Thêm hàm format giá nếu cần
export const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};