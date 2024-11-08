import React, { useState } from 'react';
import styles from '../../styles/Contact.module.css';



const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Tên:", name);
        console.log("Email:", email);
        console.log("Điện thoại:", phone);
        console.log("Tin nhắn:", message);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
    };

    return (
        <div className={styles.contactContainer}>
            <h1 className={styles.contactTitle}>Xin chào, chúng tôi ở đây để hỗ trợ bạn!</h1>
            <p className={styles.contactDescription}>
                Chúng tôi mong muốn lắng nghe ý kiến của quý khách. Vui lòng gửi mọi yêu cầu, thắc mắc theo thông tin bên dưới, chúng tôi sẽ liên lạc với bạn sớm nhất có thể.
            </p>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
                <label htmlFor="name">Họ và tên*</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập họ và tên"
                    required
                />

                <label htmlFor="email">Email*</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập địa chỉ Email"
                    required
                />

                <label htmlFor="phone">Điện thoại*</label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại"
                    required
                />

                <label htmlFor="message">Nội dung*</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Nội dung liên hệ"
                    required
                />

                <button type="submit" className={styles.submitButton}>GỬI TIN NHẮN</button>
            </form>
        </div>
    );
};

export default Contact;
