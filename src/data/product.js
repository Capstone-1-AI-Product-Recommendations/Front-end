/** @format */

// src/data/products.js

import NewProductImg from "../img/newProduct.png";
import AltProductImg1 from "../img/altProductImg1.png";
import AltProductImg2 from "../img/altProductImg2.png";
import AltProductImg3 from "../img/newProduct.png";

const products = [
  {
    id: 1,
    discount: "21%",
    badge: "COLD SALE",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2, AltProductImg3],
    rating: 4,
    description: "Sữa rửa mặt SVR có 3 sản phẩm có tên là SVR Sebiaclear Gel Moussant, SVR gel Physiopure, SVR Topialyse Gel Lavant đang được nhiều người quan tâm.",
    fullDescription: "Sản phẩm này được sản xuất từ nguyên liệu tự nhiên, mang lại hương vị ngọt mát và chất lượng tốt nhất. Được trồng theo quy trình hữu cơ, đảm bảo không có chất bảo quản hay hóa chất độc hại. Thích hợp để dùng làm món tráng miệng hoặc bổ sung vào các bữa ăn lành mạnh.",
    comments: [
      { id: 1, username: "Nguyễn Văn A", comment: "Sản phẩm rất tốt, tôi rất hài lòng!" },
      { id: 2, username: "Trần Thị B", comment: "Chất lượng tuyệt vời, giá cả hợp lý." },
    ],
  },
  {
    id: 2,
    discount: "21%",
    badge: "COLD SALE",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2, AltProductImg3],
    rating: 4,
    description: "Sữa rửa mặt SVR có 3 sản phẩm có tên là SVR Sebiaclear Gel Moussant, SVR gel Physiopure, SVR Topialyse Gel Lavant đang được nhiều người quan tâm.",
    fullDescription: "Món dưa lưới này có vị ngọt tự nhiên, mang lại trải nghiệm ẩm thực tuyệt vời cho gia đình bạn. Sản phẩm đã được cắt sẵn và đóng gói cẩn thận, đảm bảo vệ sinh và tiện lợi khi sử dụng.",
    comments: [
      { id: 1, username: "Lê Minh C", comment: "Sản phẩm dùng rất thích, sẽ mua lại!" },
      { id: 2, username: "Mai Hương", comment: "Hàng rất tốt, rất đáng tiền." },
    ],
  },
  {
    id: 3,
    discount: "59%",
    badge: "ORGANIC",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2, AltProductImg3],
    rating: 5,
    description: "Sữa rửa mặt SVR có 3 sản phẩm có tên là SVR Sebiaclear Gel Moussant, SVR gel Physiopure, SVR Topialyse Gel Lavant đang được nhiều người quan tâm.",
    fullDescription: "Dưa lưới hữu cơ này không chỉ đảm bảo hương vị tươi ngon mà còn an toàn cho sức khỏe nhờ quy trình trồng trọt không dùng thuốc trừ sâu hay phân bón hóa học. Sản phẩm được đóng gói kỹ lưỡng để giữ được độ tươi ngon lâu dài.",
    comments: [
      { id: 1, username: "Hoàng Anh", comment: "Rất hiệu quả, làn da mềm mịn hơn nhiều." },
    ],
  },
  {
    id: 4,
    discount: "59%",
    badge: "ORGANIC",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2, AltProductImg3],
    rating: 5,
    description: "Sữa rửa mặt SVR có 3 sản phẩm có tên là SVR Sebiaclear Gel Moussant, SVR gel Physiopure, SVR Topialyse Gel Lavant đang được nhiều người quan tâm.",
    fullDescription: "Sản phẩm dưa lưới tươi này được tuyển chọn từ những trái dưa chất lượng nhất, có vị ngọt thanh và giàu dinh dưỡng. Hoàn hảo cho việc dùng ngay hoặc chế biến các món tráng miệng hấp dẫn.",
    comments: [
      { id: 1, username: "Hà Trinh", comment: "Dùng rất hợp da, mình sẽ tiếp tục dùng!" },
    ],
  },
  {
    id: 5,
    discount: "59%",
    badge: "ORGANIC",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2, AltProductImg3],
    rating: 5,
    description: "Sữa rửa mặt SVR có 3 sản phẩm có tên là SVR Sebiaclear Gel Moussant, SVR gel Physiopure, SVR Topialyse Gel Lavant đang được nhiều người quan tâm.",
    fullDescription: "Được sản xuất theo tiêu chuẩn hữu cơ, sản phẩm mang đến sự an tâm tuyệt đối cho người sử dụng. Vị ngọt mát và hương thơm đặc trưng của dưa lưới sẽ làm hài lòng mọi khách hàng.",
    comments: [
      { id: 1, username: "Phan Quân", comment: "Tôi rất thích sản phẩm này. Mùi thơm nhẹ nhàng và dễ chịu." },
      { id: 2, username: "Nguyễn Kim", comment: "Sản phẩm rất phù hợp với làn da nhạy cảm của tôi." },
    ],
  },
  {
    id: 6,
    discount: "21%",
    badge: "COLD SALE",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2, AltProductImg3],
    rating: 2,
    description: "Sữa rửa mặt SVR có 3 sản phẩm có tên là SVR Sebiaclear Gel Moussant, SVR gel Physiopure, SVR Topialyse Gel Lavant đang được nhiều người quan tâm.",
    fullDescription: "Sản phẩm này thích hợp cho những ai muốn bổ sung thêm hoa quả tươi vào khẩu phần ăn hàng ngày. Dưa lưới chứa nhiều vitamin và khoáng chất có lợi cho sức khỏe.",
    comments: [
      { id: 1, username: "Trần Hoàng", comment: "Sản phẩm không phù hợp với tôi." },
    ],
  },
];

export default products;
