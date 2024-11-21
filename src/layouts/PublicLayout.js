import React from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import './PublicLayout.css';

const { Header, Content } = Layout;

const PublicLayout = () => {
  const location = useLocation();

  return (
    <Layout className="public-layout">
      {/* Header Section */}
      <Header>
        <div className="logo">
          <Link to="/"></Link>
        </div>
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/about">
            <Link to="/about">About</Link>
          </Menu.Item>
          <Menu.Item key="/contact">
            <Link to="/contact">Contact</Link>
          </Menu.Item>
          <Menu.Item key="/login" className="float-right">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="/register" className="float-right">
            <Link to="/register">Register</Link>
          </Menu.Item>
        </Menu>
      </Header>

      {/* Content Section */}
      <Content>
        <div className="public-content">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}

export default PublicLayout;
