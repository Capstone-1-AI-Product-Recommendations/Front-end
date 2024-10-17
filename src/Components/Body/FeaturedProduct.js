/** @format */

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/FeaturedProduct.css"; // Import custom CSS for additional styling
import ProductImg1 from "../../img/AdBanner.png";
import ProductImg2 from "../../img/altProductImg1.png";
import ProductImg3 from "../../img/altProductImg2.png";

const products = [
  {
    id: 1,
    discount: "56%",
    badge: "ORGANIC",
    title: "Marketside Fresh Organic Bananas, Bunch",
    price: "$0.89",
    originalPrice: "$1.99",
    images: [ProductImg1, ProductImg2, ProductImg3],
    rating: 4,
    reviews: 2,
  },
  {
    id: 2,
    discount: "56%",
    badge: "ORGANIC",
    title: "Marketside Fresh Organic Bananas, Bunch",
    price: "$0.89",
    originalPrice: "$1.99",
    images: [ProductImg1, ProductImg2, ProductImg3],
    rating: 4,
    reviews: 2,
  },
  {
    id: 3,
    discount: "56%",
    badge: "ORGANIC",
    title: "Marketside Fresh Organic Bananas, Bunch",
    price: "$0.89",
    originalPrice: "$1.99",
    images: [ProductImg1, ProductImg2, ProductImg3],
    rating: 4,
    reviews: 2,
  },
  {
    id: 3,
    discount: "56%",
    badge: "ORGANIC",
    title: "Marketside Fresh Organic Bananas, Bunch",
    price: "$0.89",
    originalPrice: "$1.99",
    images: [ProductImg1, ProductImg2, ProductImg3],
    rating: 4,
    reviews: 2,
  },
  {
    id: 3,
    discount: "56%",
    badge: "ORGANIC",
    title: "Marketside Fresh Organic Bananas, Bunch",
    price: "$0.89",
    originalPrice: "$1.99",
    images: [ProductImg1, ProductImg2, ProductImg3],
    rating: 4,
    reviews: 2,
  },
  {
    id: 3,
    discount: "56%",
    badge: "ORGANIC",
    title: "Marketside Fresh Organic Bananas, Bunch",
    price: "$0.89",
    originalPrice: "$1.99",
    images: [ProductImg1, ProductImg2, ProductImg3],
    rating: 4,
    reviews: 2,
  },
  // Thêm các sản phẩm khác tương tự
];

const FeaturedProduct = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (hoveredProduct !== null && products[hoveredProduct].images) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex >= products[hoveredProduct].images.length - 1
            ? 0
            : prevIndex + 1
        );
      }, 2000);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [hoveredProduct]);

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h4 className='mb-0'>
          Sản phẩm nổi bật{" "}
          <span className='text-muted'>
            - Đừng bỏ lỡ các ưu đãi hiện tại cho đến cuối tháng 3.
          </span>
        </h4>
        <a href='#' className='btn view-all-btn'>
          View All →
        </a>
      </div>
      <div className='row'>
        {products.map((product, index) => (
          <div key={product.id} className='col-md-3 mb-2'>
            <div className='card product-card h-100'>
              <div className='card-body'>
                <span className='discount-badge'>{product.discount}</span>
                <div className='image-container'>
                  <img
                    src={
                      hoveredProduct === index &&
                      product.images &&
                      product.images.length > 0
                        ? product.images[currentImageIndex]
                        : product.images[0]
                    }
                    alt={product.title}
                    className='img-fluid product-image mb-3'
                    onMouseEnter={() => setHoveredProduct(index)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  />
                </div>
                <span className='badge bg-success text-uppercase product-badge mb-2'>
                  {product.badge}
                </span>
                <h6 className='product-title mb-2'>{product.title}</h6>
                <div className='rating mb-2'>
                  {Array.from({ length: 5 }, (_, idx) => (
                    <span
                      key={idx}
                      className={idx < product.rating ? "star filled" : "star"}
                    >
                      ★
                    </span>
                  ))}
                  <span className='reviews'> ({product.reviews})</span>
                </div>
                <p className='price mb-0'>
                  <strong className='price-new text-danger'>
                    {product.price}
                  </strong>
                  <span className='text-muted ms-2'>
                    <del className='price-old'>{product.originalPrice}</del>
                  </span>
                </p>
                <button className='btn add-to-cart w-100 mt-3'>
                  Add to cart
                </button>
                <p className='note text-muted mt-2'>
                  Remains until the end of the offer
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
