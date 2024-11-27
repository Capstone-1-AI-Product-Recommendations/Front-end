/** @format */
import NewProductImg from "../img/Product/newProduct.png";
import AltProductImg1 from "../img/Product/altProductImg1.png";
import AltProductImg2 from "../img/Product/altProductImg2.png";

const ProductDetailData = [
  {
    id: 1,
    title: "Sữa Rửa Mặt SVR Cho Da Dầu Mụn - SVR Sebiaclear Gel Moussant 400ml Loại Bỏ Tế Bào Da Chết SRM mpdk2",
    price: "₫256.000",
    originalPrice: "₫480.000",
    discount: "47%",
    imageUrl: NewProductImg,
    altImages: [NewProductImg, AltProductImg1, AltProductImg2, NewProductImg],
    rating: 5.0,
    totalReviews: 152,
    totalSold: "2,4k",
    
    // Mã giảm giá
    promotions: [
      { code: "GIẢM32K", value: "32.000" },
      { code: "GIẢM17K", value: "17.000" },
      { code: "GIẢM12K", value: "12.000" }
    ],

    // Vận chuyển
    shipping: {
      returnPolicy: "Trả hàng 15 ngày",
      freeShipping: "Trả hàng miễn phí",
      insurance: {
        title: "Bảo hiểm bảo vệ người tiêu dùng",
        isNew: true
      },
      location: "Phường Chính Gián, Quận Thanh Khê",
      shippingFee: {
        min: "20.250",
        max: "32.700"
      }
    },

    // Số lượng
    quantity: {
      available: 11537,
      min: 1
    },

    // CHI TIẾT SẢN PHẨM
    details: {
      category: ["Chăm sóc da", "Sữa rửa mặt", "Da dầu mụn"],
      brand: "SVR",
      origin: "Pháp",
      volume: "400ml",
      weight: "400g",
      skinType: "Da dầu mụn",
      expiryDate: "36 tháng kể từ ngày sản xuất",
      sku: "SRM-mpdk2",
      status: "Còn hàng"
    },

    // MÔ TẢ SẢN PHẨM
    description: {
      intro: `Giữa hàng ngàn các sản phẩm làm đẹp khác nhau, Mint lựa chọn trở thành nhà phân phối chính hãng của SVR bởi sự an toàn về thành phần ngay cả với làn da nhạy cảm, cũng như đem đến giá cả phải chăng dành cho các cô gái của Mint.

Sữa Rửa Mặt SVR Sebiaclear Gel Moussant là sản phẩm gel rửa mặt dành cho làn da dầu mụn đến từ thương hiệu dược mỹ phẩm SVR, với công thức không chứa xà phòng giúp làm sạch, nhẹ nhàng làm thông thoáng làn da. Khả năng tạo bọt mịn giúp loại trừ các chất bẩn và lượng bã nhờn dư thừa mà không làm khô da. Có thể rửa sạch dễ dàng, mang lại một làn da sạch, tươi mát và khô thoáng.`,
      
      skinType: "da hỗn hợp đến da dầu, da mụn nhạy cảm",
      
      skinConditions: [
        "Da dầu thừa - lỗ chân lông to.",
        "Da mụn trứng cá, mụn đầu đen, mụn ẩn do bít tắc lỗ chân lông."
      ],
      
      highlights: [
        "Gluconolactone với tác động giảm viêm và tiêu sừng, giúp làm sạch da và thông thoáng lỗ chân lông. Hiệu quả tương tự như AHAs với độ dung nạp tốt hơn.",
        "Niacinamide có tác dụng giảm khuẩn và điều tiết bã nhờn.",
        "Các tác nhân làm sạch dịu nhẹ giúp làm sạch hiệu quả trong khi vẫn giữ vững sự cân bằng cho làn da nhạy cảm.",
        "Mat SR (2%) giúp điều hòa lượng bã nhờn dư thừa, cho làn da không bóng dầu.",
        "Dạng gel không chứa xà phòng, tạo bọt mịn, giúp làm sạch da hiệu quả nhưng không gây khô căng, dễ dàng rửa sạch mà không nhờn rít."
      ],
      
      ingredients: `
        - Không chứa xà phòng
        - Không chứa cồn
        - Không chứa chất tạo màu
        - Không chứa paraben
        - Không gây dị ứng
      `,
      
      tags: ["svr", "mun", "nhaycam", "srm", "chinhhang"]
    },

    // ĐÁNH GIÁ SẢN PHẨM
    reviews: {
      averageRating: 5.0,
      totalReviews: 152,
      totalSold: "2,4k",
      ratingDistribution: {
        5: 152,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      },
      withComments: 77,
      withImages: 31,
      commentList: [
        {
          id: 1,
          username: "Mai Anh",
          rating: 5,
          date: "2024-02-15",
          comment: "Sản phẩm rửa mặt rất dịu nhẹ, không gây khô da. Đóng gói cẩn thận!",
          likes: 12,
          hasImage: true,
          verified: true
        },
        {
          id: 2,
          username: "Hương Giang",
          rating: 5,
          date: "2024-02-10",
          comment: "Dùng một thời gian thấy da sạch và khỏe hơn hẳn. Sẽ mua lại.",
          likes: 8,
          hasImage: false,
          verified: true
        },
        {
          id: 3,
          username: "Thanh Thảo",
          rating: 5,
          date: "2024-02-05",
          comment: "Chất gel trong suốt, rửa sạch không khô da. Rất thích!",
          likes: 5,
          hasImage: true,
          verified: false
        }
      ]
    }
  },
  
  {
    id: 2,
    title: "Kem Chống Nắng La Roche-Posay Anthelios UVMune 400 Invisible Fluid SPF50+ 50ml",
    price: "₫415.000",
    originalPrice: "₫505.000",
    discount: "18%",
    imageUrl: NewProductImg,
    altImages: [NewProductImg, AltProductImg1, AltProductImg2, NewProductImg],
    rating: 4.9,
    totalReviews: 245,
    totalSold: "5,1k",
    
    promotions: [
      { code: "GIẢM50K", value: "50.000" },
      { code: "GIẢM25K", value: "25.000" },
      { code: "GIẢM15K", value: "15.000" }
    ],

    shipping: {
      returnPolicy: "Trả hàng 15 ngày",
      freeShipping: "Trả hàng miễn phí",
      insurance: {
        title: "Bảo hiểm bảo vệ người tiêu dùng",
        isNew: true
      },
      location: "Phường Chính Gián, Quận Thanh Khê",
      shippingFee: {
        min: "20.250",
        max: "32.700"
      }
    },

    quantity: {
      available: 8756,
      min: 1
    },

    details: {
      category: ["Chăm sóc da", "Kem chống nắng", "Da nhạy cảm"],
      brand: "La Roche-Posay",
      origin: "Pháp",
      volume: "50ml",
      weight: "50g",
      skinType: "Mọi loại da, đặc biệt da nhạy cảm",
      expiryDate: "36 tháng kể từ ngày sản xuất",
      sku: "LRP-KCN-400",
      status: "Còn hàng"
    },

    description: {
      intro: `La Roche-Posay Anthelios UVMune 400 là kem chống nắng thế hệ mới với công nghệ cách mạng Mexoryl 400, bảo vệ da khỏi tia UVA dài - tác nhân gây lão hóa sâu.

Sản phẩm có kết cấu dạng sữa lỏng nhẹ, thấm nhanh vào da, không để lại vệt trắng và không gây bết dính. Công thức không chứa hương liệu, không gây kích ứng, phù hợp cho cả làn da nhạy cảm nhất.`,
      
      skinType: "Mọi loại da, đặc biệt da nhạy cảm",
      
      skinConditions: [
        "Da dễ kích ứng với ánh nắng",
        "Da cần bảo vệ tối ưu khỏi tác hại của tia UV"
      ],
      
      highlights: [
        "Công nghệ Mexoryl 400 độc quyền, bảo vệ da khỏi tia UVA dài",
        "Kết cấu dạng sữa lỏng nhẹ, thấm nhanh, không nhờn rít",
        "Không gây bít tắc lỗ chân lông",
        "Không chứa hương liệu, phù hợp cho da nhạy cảm",
        "Khả năng chống nước và mồ hôi tốt"
      ],
      
      ingredients: `
        - Không chứa hương liệu
        - Không cồn
        - Không paraben
        - Không gây bít tắc lỗ chân lông
        - Đã được kiểm nghiệm da liễu
      `,
      
      tags: ["larocheposay", "chongnang", "nhaycam", "spf50", "chinhhang"]
    },

    reviews: {
      averageRating: 4.9,
      totalReviews: 245,
      totalSold: "5,1k",
      ratingDistribution: {
        5: 200,
        4: 35,
        3: 8,
        2: 2,
        1: 0
      },
      withComments: 156,
      withImages: 89,
      commentList: [
        {
          id: 1,
          username: "Thùy Linh",
          rating: 5,
          date: "2024-02-18",
          comment: "Kem chống nắng rất nhẹ nhàng, thấm nhanh và không gây bít tắc lỗ chân lông. Rất thích!",
          likes: 45,
          hasImage: true,
          verified: true
        },
        {
          id: 2,
          username: "Minh Tâm",
          rating: 5,
          date: "2024-02-12",
          comment: "Đã dùng được 2 tuần, da không bị kích ứng. Chống nắng hiệu quả, đi nắng không bị đen.",
          likes: 28,
          hasImage: true,
          verified: true
        },
        {
          id: 3,
          username: "Hoàng Anh",
          rating: 4,
          date: "2024-02-08",
          comment: "Sản phẩm tốt, chỉ hơi đắt một chút. Khả năng chống nắng rất ổn.",
          likes: 15,
          hasImage: false,
          verified: true
        }
      ]
    }
  }
];

export default ProductDetailData;