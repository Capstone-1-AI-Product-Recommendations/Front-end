import React, { useState } from 'react';
import './UserManagement.css';
import { MdEditNote } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { IoMdNotifications } from 'react-icons/io';
import SellerRequestManagement from './SellerRequestManagement';

const UserManagement = () => {
  const [users, setUsers] = useState(
    Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      username: `user${index + 1}`,
      email: `user${index + 1}@example.com`,
      fullname: `Người dùng ${index + 1}`,
      role: index % 3 === 0 ? 'admin' : (index % 3 === 1 ? 'seller' : 'user'),
      status: index % 2 === 0 ? 1 : 0,
      permissions: {
        search: true,
        tourManagement: index % 3 !== 2,
        revenueStats: index % 3 !== 2,
        permissions: index % 3 === 0
      }
    }))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    phone: '',
    role: 'User'
  });
  const [roleFilter, setRoleFilter] = useState('all');
  const [showSellerManagement, setShowSellerManagement] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.fullname.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePermissionChange = (userId, feature) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? {
              ...user,
              permissions: {
                ...user.permissions,
                [feature]: !user.permissions[feature]
              }
            }
          : user
      )
    );
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const toggleManagementView = () => {
    setShowSellerManagement(!showSellerManagement);
  };

  const handleSubmit = () => {
    const newId = users.length + 1;
    const newUserData = {
      id: newId,
      username: `user${newId}`,
      email: newUser.email,
      fullname: `Người dùng ${newId}`,
      role: newUser.role.toLowerCase(),
      status: 1,
      permissions: {
        search: true,
        tourManagement: newUser.role !== 'User',
        revenueStats: newUser.role !== 'User',
        permissions: newUser.role === 'Admin'
      }
    };
    
    setUsers([...users, newUserData]);
    handleClose();
    setNewUser({
      email: '',
      phone: '',
      role: 'User'
    });
  };

  return (
    <div className="permission-container">
      {!showSellerManagement ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Quản lý người dùng</h4>
          </div>
          <div className="permission-header d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex gap-3 align-items-center">
              <div className="search-box">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="role-filter">
                <select 
                  className="form-select" 
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">Tất cả</option>
                  <option value="admin">Admin</option>
                  <option value="seller">Seller</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div 
                className="notification-icon-container"
                onClick={toggleManagementView}
                role="button"
              >
                <IoMdNotifications className="notification-icon" />
                <span className="notification-badge">{notificationCount}</span>
              </div>
              <button className="btn btn-primary" onClick={handleShow}>
                + Thêm
              </button>
            </div>
          </div>

          <table className="permission-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Họ tên</th>
                <th>Vai trò</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.fullname}</td>
                  <td>{user.role}</td>
                  <td className="action-buttons-admin">
                    <MdEditNote className="edit-icon-admin me-4 ms-3  " />
                    <FaTrash className="delete-icon-admin md-2" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Trước
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Sau
            </button>
          </div>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Thêm tài khoản mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Số điện thoại"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Select 
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  >
                    <option value="User">User</option>
                    <option value="Seller">Seller</option>
                    <option value="Admin">Admin</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Hủy
              </Button>
              <Button variant="success" onClick={handleSubmit}>
                Lưu
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <div className="seller-request-view">
          <SellerRequestManagement 
            onPendingCountChange={setNotificationCount}
            toggleManagementView={toggleManagementView}
          />
        </div>
      )}
    </div>
  );
};

export default UserManagement; 