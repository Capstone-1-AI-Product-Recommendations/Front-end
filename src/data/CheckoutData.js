const getDeliveryDates = (shippingType) => {
  const today = new Date();
  const startDate = new Date(today);
  const endDate = new Date(today);
  
  if (shippingType === "Nhanh") {
    startDate.setDate(today.getDate() + 3);
    endDate.setDate(today.getDate() + 5);
  } else {
    startDate.setDate(today.getDate() + 5);
    endDate.setDate(today.getDate() + 7);
  }

  const formatDate = (date) => {
    return `${date.getDate()} Tháng ${date.getMonth() + 1}`;
  };

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

export const CheckoutData = {
  // Thông tin địa chỉ
  addressData: [
    {
      id: 1,
      name: "Trần Thị Mỹ Duyên",
      phone: "(+84) 999999999",
      address: "123 Điện Biên Phủ, Phường Chính Gián, Quận Thanh Khê, Đà Nẵng",
      isDefault: true
    },
    {
      id: 2,
      name: "Trần Văn A",
      phone: "(+84) 999999999",
      address: "123 Đường Nguyễn Tất Thành, Phường Xuân Hà, Quận Thanh Khê, Đà Nẵng",
      isDefault: false
    },
    {
      id: 3,
      name: "Nguyễn Văn B",
      phone: "(+84) 999999999",
      address: "456 Lê Lợi, Phường Hòa Thuận, Quận Hải Châu, Đà Nẵng",
      isDefault: false
    }
  ],

  // Danh sách sản phẩm
  products: [
    {
      id: 1,
      name: "Giày Nike Air Force 1 Low White Đế Air Siêu Nhẹ Nam Nữ",
      variant: "Size 42",
      price: 448000,
      originalPrice: 500000,
      quantity: 1,
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-22110-e9lxg3h8ggjv91",
      shop: {
        id: 1,
        name: "Nike Official Store",
        isOfficial: true
      }
    },
    {
      id: 2,
      name: "Giày Nike Air Jordan 1 Low Panda Black White Nam Nữ",
      variant: "Size 41",
      price: 550000,
      originalPrice: 650000,
      quantity: 1,
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lf6q3f96cqhx15",
      shop: {
        id: 1,
        name: "Nike Official Store",
        isOfficial: true
      }
    }
  ],


  // Thông tin vận chuyển
  shippingData: {
    method: "Nhanh",
    fee: 16500,
    estimatedDelivery: getDeliveryDates("Nhanh"),
    options: [
      {
        id: 1,
        name: "Nhanh",
        price: 16500,
        time: getDeliveryDates("Nhanh")
      },
      {
        id: 2,
        name: "Tiết kiệm",
        price: 12000,
        time: getDeliveryDates("Tiết kiệm")
      }
    ]
  },

  // Phương thức thanh toán
  paymentMethods: [
    {
      id: 1,
      name: "Thanh toán khi nhận hàng",
      code: "COD",
      isDefault: true
    },
    {
      id: 2,
      name: "Ví ShopeePay",
      code: "SHOPEEPAY",
      isDefault: false
    },
    {
      id: 3,
      name: "Thẻ Tín dụng/Ghi nợ",
      code: "CREDIT_CARD",
      isDefault: false
    }
  ],

  // Voucher và khuyến mãi
  vouchers: {
    shopVouchers: [
      {
        id: 1,
        code: "SHOP10",
        discount: 10000,
        minSpend: 100000,
        description: "Giảm 10.000đ cho đơn hàng từ 100.000đ"
      }
    ],
    platformVouchers: [
      {
        id: 1,
        code: "FREESHIP",
        discount: 15000,
        type: "shipping",
        description: "Miễn phí vận chuyển đến 15.000đ"
      }
    ]
  },

  // Cấu hình tính toán
  calculations: {
    subtotal: 998000,
    shippingFee: 16500,
    insuranceFee: 23999,
    total: 1014500,
    discount: 0
  }
};

// Các hàm tiện ích
export const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};

export const calculateTotal = (products, shippingFee, discount = 0) => {
  const subtotal = products.reduce((total, item) => total + (item.price * item.quantity), 0);
  return subtotal + shippingFee - discount;
};