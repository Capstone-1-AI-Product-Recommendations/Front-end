/** @format */

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Minus, Plus, Heart, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ProductDetail = ({ onCartUpdate }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!state?.product) {
    navigate("/");
    return null;
  }

  const { product } = state;
  const allImages = [product.imageUrl, ...product.altImages];

  const handleAddToCart = () => {
    onCartUpdate((prev) => prev + quantity);
    toast({
      title: "Thêm vào giỏ hàng thành công!",
      description: `${quantity} ${product.title} đã được thêm vào giỏ hàng của bạn.`,
      duration: 2000,
    });
  };

  const RatingStars = ({ rating }) => (
    <div className='flex items-center gap-2'>
      <div className='flex gap-1'>
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={20}
            className={`${
              index < rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      <span className='text-gray-600'>({rating} đánh giá)</span>
    </div>
  );

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid md:grid-cols-2 gap-8'>
        {/* Image Gallery */}
        <div className='space-y-4'>
          <div className='aspect-square relative rounded-lg overflow-hidden'>
            <img
              src={allImages[selectedImage]}
              alt={product.title}
              className='object-cover w-full h-full'
            />
            <div className='absolute top-4 left-4 space-x-2'>
              <Badge variant='destructive'>-{product.discount}</Badge>
              <Badge variant='success'>{product.badge}</Badge>
            </div>
          </div>
          <div className='grid grid-cols-4 gap-4'>
            {allImages.map((image, index) => (
              <div
                key={index}
                className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.title} - View ${index + 1}`}
                  className='object-cover w-full h-full'
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className='space-y-6'>
          <div>
            <h1 className='text-3xl font-bold mb-2'>{product.title}</h1>
            <RatingStars rating={product.rating} />
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-4'>
              <span className='text-3xl font-bold text-primary'>
                {product.price}
              </span>
              <span className='text-xl text-gray-400 line-through'>
                {product.originalPrice}
              </span>
            </div>
            <p className='text-red-500'>
              Tiết kiệm: {product.discount} (
              {parseInt(product.originalPrice.replace(/\D/g, "")) -
                parseInt(product.price.replace(/\D/g, ""))}
              ₫)
            </p>
          </div>

          <div className='space-y-4'>
            <div className='flex items-center gap-4'>
              <span className='text-gray-600'>Số lượng:</span>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={16} />
                </Button>
                <span className='w-12 text-center'>{quantity}</span>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            <div className='flex gap-4'>
              <Button
                size='lg'
                className='flex-1 gap-2'
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} />
                Thêm vào giỏ hàng
              </Button>
              <Button size='lg' variant='outline'>
                <Heart size={20} />
              </Button>
              <Button size='lg' variant='outline'>
                <Share2 size={20} />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className='p-4'>
              <h3 className='font-semibold mb-2'>Thông tin sản phẩm:</h3>
              <ul className='list-disc list-inside space-y-2 text-gray-600'>
                <li>Sản phẩm organic 100% tự nhiên</li>
                <li>Được chứng nhận an toàn thực phẩm</li>
                <li>Bảo quản: Nhiệt độ từ 2-8°C</li>
                <li>Xuất xứ: Việt Nam</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
