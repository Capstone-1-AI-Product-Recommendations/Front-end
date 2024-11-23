/** @format */

import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const currentDate = new Date().toLocaleDateString();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Điều chỉnh chiều cao của textarea khi người dùng nhập nội dung
  useEffect(() => {
    const adjustTextareaHeight = () => {
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;

        // Giới hạn chiều cao tối đa
        if (inputRef.current.scrollHeight > 120) {
          inputRef.current.style.height = "120px";
          inputRef.current.style.overflowY = "auto";
        } else {
          inputRef.current.style.overflowY = "hidden";
        }
      }
    };

    if (inputRef.current) {
      inputRef.current.addEventListener("input", adjustTextareaHeight);
    }

    // Cleanup event listener khi component unmount
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("input", adjustTextareaHeight);
      }
    };
  }, []);

  // Cơ sở dữ liệu sản phẩm mở rộng
  const products = {
    cosmetics: [
      {
        name: "L'Oreal Face Cream",
        price: 25,
        category: "Skincare",
        rating: 4.5,
        features: ["Moisturizing", "Anti-aging", "SPF 30"],
      },
      {
        name: "Laneige Water Mask",
        price: 35,
        category: "Skincare",
        rating: 4.8,
        features: ["Overnight mask", "Hydrating", "Oil-free"],
      },
      {
        name: "Neige Cream",
        price: 45,
        category: "Skincare",
        rating: 4.7,
        features: ["Whitening", "Anti-wrinkle", "Natural ingredients"],
      },
    ],
    electronics: [
      {
        name: "Airpod Pro 3",
        price: 199,
        category: "Audio",
        rating: 4.6,
        features: [
          "Noise cancellation",
          "Wireless charging",
          "Water resistant",
        ],
      },
      {
        name: "VinFast Electric Scooter",
        price: 899,
        category: "Vehicle",
        rating: 4.3,
        features: ["Electric powered", "Smart features", "Long range"],
      },
      {
        name: "Smart Watch Pro",
        price: 299,
        category: "Wearable",
        rating: 4.4,
        features: ["Heart rate monitor", "GPS", "Water proof"],
      },
    ],
    fashion: [
      {
        name: "Adidas Forum 84 Low",
        price: 89,
        category: "Shoes",
        rating: 4.5,
        features: ["Classic design", "Comfortable", "Durable"],
      },
      {
        name: "Barcelona Jersey 24/25",
        price: 79,
        category: "Sports",
        rating: 4.6,
        features: ["Official merchandise", "Breathable fabric", "2024 design"],
      },
      {
        name: "Tiger Tokuten",
        price: 95,
        category: "Shoes",
        rating: 4.4,
        features: ["Japanese design", "Premium materials", "Vintage style"],
      },
    ],
  };

  const quickOptions = [
    { icon: "🛍️", text: "Tư vấn sản phẩm" },
    { icon: "⚖️", text: "So sánh sản phẩm" },
    { icon: "🔍", text: "Tìm sản phẩm" },
    { icon: "💲", text: "Khuyến mãi" },
  ];

  const handleProductComparison = (category) => {
    if (products[category]) {
      const sortedProducts = [...products[category]].sort(
        (a, b) => b.rating - a.rating
      );
      return `Top sản phẩm ${category}:\n
            1. ${sortedProducts[0].name}
               Giá: $${sortedProducts[0].price}
               Đánh giá: ${sortedProducts[0].rating}⭐
               Tính năng: ${sortedProducts[0].features.join(", ")}\n
            2. ${sortedProducts[1].name}
               Giá: $${sortedProducts[1].price}
               Đánh giá: ${sortedProducts[1].rating}⭐
               Tính năng: ${sortedProducts[1].features.join(", ")}\n
            3. ${sortedProducts[2].name}
               Giá: $${sortedProducts[2].price}
               Đánh giá: ${sortedProducts[2].rating}⭐
               Tính năng: ${sortedProducts[2].features.join(", ")}`;
    }
    return "Xin lỗi, hiện tại chúng tôi không có thông tin về danh mục sản phẩm này.";
  };

  const handleQuickOption = (option) => {
    let response = "";
    switch (option) {
      case "Tư vấn sản phẩm":
        response =
          "Bạn muốn được tư vấn về sản phẩm nào? (cosmetics/electronics/fashion)";
        break;
      case "So sánh sản phẩm":
        response =
          "Bạn muốn so sánh sản phẩm nào? Gõ 'so sánh [danh mục]' (ví dụ: so sánh cosmetics)";
        break;
      case "Tìm sản phẩm":
        response =
          "Bạn đang tìm kiếm sản phẩm gì? Tôi có thể giúp tìm theo tên hoặc danh mục.";
        break;
      case "Khuyến mãi":
        response =
          "Hiện tại đang có các chương trình khuyến mãi:\n- Giảm 50% thời trang\n- Mua 1 tặng 1 mỹ phẩm\n- Flash sale điện tử";
        break;
      default:
        response = "Bạn cần hỗ trợ gì ạ?";
    }
    setMessages([
      ...messages,
      { text: option, sender: "user" },
      { text: response, sender: "bot" },
    ]);
  };

  const generateResponse = (input) => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("so sánh")) {
      for (const category of Object.keys(products)) {
        if (lowerInput.includes(category)) {
          return handleProductComparison(category);
        }
      }
      return "Vui lòng chỉ rõ danh mục sản phẩm bạn muốn so sánh (cosmetics/electronics/fashion)";
    } else if (lowerInput.includes("tư vấn")) {
      return "Bạn cần tư vấn về sản phẩm nào? Tôi có thể giúp bạn tìm hiểu về:\n- Mỹ phẩm\n- Điện tử\n- Thời trang";
    } else if (
      lowerInput.includes("khuyến mãi") ||
      lowerInput.includes("giảm giá")
    ) {
      return "Hiện tại đang có các chương trình khuyến mãi:\n- Giảm 50% thời trang\n- Mua 1 tặng 1 mỹ phẩm\n- Flash sale điện tử";
    } else if (
      lowerInput.includes("hello") ||
      lowerInput.includes("hi") ||
      lowerInput.includes("chào")
    ) {
      return "Xin chào! Tôi có thể giúp gì cho bạn?";
    } else {
      return "Xin lỗi, tôi không hiểu yêu cầu của bạn. Bạn có thể chọn một trong các tùy chọn bên dưới để được hỗ trợ.";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      text: inputText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    const botMessage = {
      text: generateResponse(inputText),
      sender: "bot",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, userMessage, botMessage]);
    setInputText("");
    setShowOptions(false);
  };

  return (
    <div className='chatbot-container'>
      <button className='chatbot-toggle' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className='chatbot-window'>
          <div className='chatbot-header'>
            <div className='header-title'>
              <h3>Shopping Assistant</h3>
              <span className='date'>{currentDate}</span>
            </div>
            <div className='header-icons'>
              <button className='icon-button'>😊</button>
              <button className='icon-button'>📎</button>
            </div>
          </div>
          <div className='chatbot-messages'>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className='message-content'>{message.text}</div>
                <div className='message-timestamp'>{message.timestamp}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className='quick-options'>
            {quickOptions.map((option, index) => (
              <button
                key={index}
                className='quick-option-button'
                onClick={() => handleQuickOption(option.text)}
              >
                <span>{option.icon}</span>
                <span>{option.text}</span>
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className='chatbot-input-form'>
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder='Nhập tin nhắn...'
              rows='1'
              className='chatbot-textarea'
            />
            <button type='submit'>Gửi</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
