import React from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const LoginScreen = () => {
  return (
    <Container className="p-4 shadow bg-body rounded" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Chào mừng bạn trở lại! 👋</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Nhập email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="Mật khẩu" />
          <Form.Text className="text-muted text-end">
            Quên mật khẩu?
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Ghi nhớ đăng nhập" />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-3">
          Đăng nhập
        </Button>

        <div className="text-center mb-3">Hoặc đăng nhập bằng</div>

        <Button variant="primary" className="mb-2 w-100" style={{ backgroundColor: '#1877F2' }}>
          Đăng nhập bằng Facebook
        </Button>
        <Button variant="light" className="w-100" style={{ color: '#555' }}>
          Đăng nhập bằng Google
        </Button>
      </Form>
      <div className="text-center mt-4">
        Chưa có tài khoản? <a href="#sign-up">Đăng ký ngay</a>
      </div>
    </Container>
  );
};

export default LoginScreen;
