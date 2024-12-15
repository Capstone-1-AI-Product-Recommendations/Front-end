import React, { useState, useRef, useEffect } from 'react';
import './Chatbox.css';

const Chatbox = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Xin chào, tôi cần hỗ trợ về sản phẩm", sender: "customer", time: "10:00" },
    { id: 2, text: "Chào bạn, tôi có thể giúp gì cho bạn?", sender: "seller", time: "10:01" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [activeCustomer, setActiveCustomer] = useState({
    id: 1,
    name: "Khách hàng 1",
    status: "online",
    avatar: "K1"
  });
  
  const messagesEndRef = useRef(null);
  const customers = [
    { id: 1, name: "Khách hàng 1", status: "online", avatar: "K1", unread: 0 },
    { id: 2, name: "Khách hàng 2", status: "offline", avatar: "K2", unread: 3 },
    { id: 3, name: "Khách hàng 3", status: "online", avatar: "K3", unread: 1 },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "seller",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleCustomerSelect = (customer) => {
    setActiveCustomer(customer);
  };

  return (
    <div className="chatbox-container">
      <div className="customers-list">
        <div className="customers-header">
          <h3>Trò chuyện</h3>
        </div>
        {customers.map(customer => (
          <div 
            key={customer.id} 
            className={`customer-item ${activeCustomer.id === customer.id ? 'active' : ''}`}
            onClick={() => handleCustomerSelect(customer)}
          >
            <div className="customer-avatar">{customer.avatar}</div>
            <div className="customer-info">
              <div className="customer-name">{customer.name}</div>
              <div className="customer-status">
                <span className={`status-dot ${customer.status}`}></span>
                {customer.status}
              </div>
            </div>
            {customer.unread > 0 && (
              <div className="unread-badge">{customer.unread}</div>
            )}
          </div>
        ))}
      </div>

      <div className="chat-section">
        <div className="chat-header">
          <div className="customer-avatar">{activeCustomer.avatar}</div>
          <div className="customer-info">
            <div className="customer-name">{activeCustomer.name}</div>
            <div className="customer-status">
              <span className={`status-dot ${activeCustomer.status}`}></span>
              {activeCustomer.status}
            </div>
          </div>
        </div>

        <div className="messages-container">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`message ${message.sender === "seller" ? "sender" : "receiver"}`}
            >
              <div className="message-content">{message.text}</div>
              <div className="message-time">{message.time}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="message-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
          />
          <button type="submit">Gửi</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;