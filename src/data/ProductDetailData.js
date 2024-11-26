/** @format */
import NewProductImg from "../img/Product/newProduct.png";
import AltProductImg1 from "../img/Product/altProductImg1.png";
import AltProductImg2 from "../img/Product/altProductImg2.png";
import AltProductImg3 from "../img/Product/newProduct.png";

const ProductDetailData = [
  {
    id: 1,
    title: "Sữa Rửa Mặt SVR Sebiaclear Gel Moussant",
    price: "₫ 320.000",
    originalPrice: "₫ 425.000",
    discount: "25%",
    badge: "HOT SALE",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2, AltProductImg3],
    rating: 5,
    
    // CHI TIẾT SẢN PHẨM
    details: {
      brand: "SVR",
      origin: "Pháp",
      volume: "200ml",
      skinType: "Mọi loại da",
      status: "Còn hàng",
      sku: "SVR001"
    },

    // MÔ TẢ SẢN PHẨM
    description: `Sữa rửa mặt SVR Sebiaclear Gel Moussant là sản phẩm làm sạch chuyên sâu, phù hợp cho da dầu mụn và da nhạy cảm.

Ưu điểm nổi bật:
- Làm sạch sâu, kiểm soát dầu
- Ngăn ngừa mụn hiệu quả
- Không gây khô da, không kích ứng
- Phù hợp cho da nhạy cảm

Thành phần chính:
- Gluconolactone
- Niacinamide
- Zinc Gluconate
- Không chứa xà phòng
- Không Paraben`,

    // ĐÁNH GIÁ SẢN PHẨM
    reviews: {
      averageRating: 5,
      totalReviews: 157,
      fiveStar: 157,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
      hasComments: 77,
      hasImages: 31,
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
    title: "Giày Thể Thao Nike Air Force 1 '07",
    price: "₫ 2.649.000",
    originalPrice: "₫ 3.239.000",
    discount: "18%",
    badge: "BEST SELLER",
    imageUrl: AltProductImg1,
    altImages: [AltProductImg2, AltProductImg3, NewProductImg],
    rating: 5,
    
    // CHI TIẾT SẢN PHẨM
    details: {
      brand: "Nike",
      origin: "Chính hãng",
      material: "Da cao cấp",
      style: "Sneaker",
      status: "Còn hàng",
      sku: "NK-AF107-WHT"
    },

    // MÔ TẢ SẢN PHẨM
    description: `Nike Air Force 1 '07 - Biểu tượng của phong cách đường phố.

Ưu điểm nổi bật:
- Thiết kế cổ điển, phong cách vượt thời gian
- Chất liệu da cao cấp, bền đẹp
- Đế Air độc quyền, êm ái thoải mái
- Dễ dàng kết hợp nhiều phong cách

Đặc điểm sản phẩm:
- Upper: Da cao cấp
- Đế: Công nghệ Air độc quyền
- Màu sắc: Triple White
- Phù hợp: Đi học, đi chơi, đi làm
- Bảo hành: 12 tháng`,

    // ĐÁNH GIÁ SẢN PHẨM
    reviews: {
      averageRating: 5,
      totalReviews: 235,
      fiveStar: 235,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
      hasComments: 180,
      hasImages: 45,
      commentList: [
        {
          id: 1,
          username: "Minh Đức",
          rating: 5,
          date: "2024-02-14",
          comment: "Giày đẹp, form chuẩn, đi rất êm chân. Đúng hàng chính hãng!",
          likes: 28,
          hasImage: true,
          verified: true
        },
        {
          id: 2,
          username: "Thu Trang",
          rating: 5,
          date: "2024-02-12",
          comment: "Hàng chính hãng, đóng gói cẩn thận. Màu trắng rất dễ phối đồ.",
          likes: 15,
          hasImage: true,
          verified: true
        },
        {
          id: 3,
          username: "Hoàng Nam",
          rating: 5,
          date: "2024-02-08",
          comment: "Đôi này đi rất thoải mái, size vừa vặn. Sẽ ủng hộ shop dài dài!",
          likes: 7,
          hasImage: false,
          verified: true
        }
      ]
    }
  }
];

export default ProductDetailData;