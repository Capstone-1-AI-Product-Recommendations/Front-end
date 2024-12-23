import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import { MdEditNote } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { IoMdNotifications } from 'react-icons/io';
import SellerRequestManagement from './SellerRequestManagement';
import adminService from '../../../../services/adminService';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    phone: '',
    role: 'User',
    password: '' // Add password field
  });
  const [roleFilter, setRoleFilter] = useState('all');
  const [showSellerManagement, setShowSellerManagement] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminService.getUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [roleFilter]);

  // Filter users first
  const filteredUsers = users.filter(user => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesRole = roleFilter === 'all' || user.role_name?.toLowerCase() === roleFilter.toLowerCase();
    
    const matchesSearch = searchTerm === '' || [
      user.username,
      user.email,
      user.full_name
    ].some(field => field?.toLowerCase()?.includes(searchTermLower));

    return matchesRole && matchesSearch;
  });

  // Then paginate filtered results
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

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await adminService.deleteUser(userId);
        setUsers(users.filter(user => user.user_id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user.');
      }
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const toggleManagementView = () => {
    setShowSellerManagement(!showSellerManagement);
  };

  const handleSubmit = async () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const newUserData = {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      role_name: newUser.role.toLowerCase()
    };

    try {
      const createdUser = await adminService.createUser(newUserData);
      setUsers([...users, createdUser]);
      handleClose();
      setNewUser({
        username: '',
        email: '',
        role: 'User',
        password: ''
      });
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user.');
    }
  };

  const handleExport = async () => {
    try {
        const fileData = await adminService.exportUsers(); // Call the export API

        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${currentDate
            .getDate()
            .toString()
            .padStart(2, '0')}`; // Format: YYYY-MM-DD
        const fileName = `UserExport_${formattedDate}.csv`; // Dynamic file name

        const blob = new Blob([fileData], {
            type: 'text/csv;charset=utf-8;',
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName; // Use dynamic file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log(`File ${fileName} has been downloaded successfully.`);
    } catch (error) {
        console.error('Failed to export users:', error);
    }
};

  const renderPagination = () => {
    const range = [];
    const showPages = 5; // Number of pages to show before and after current page
  
    // Always add first page
    range.push(1);
  
    // Add pages around current page
    for (let i = Math.max(2, currentPage - showPages); i <= Math.min(totalPages - 1, currentPage + showPages); i++) {
      if (i === 2 && currentPage - showPages > 2) {
        range.push('...');
      }
      
      if (!range.includes(i)) {
        range.push(i);
      }
      
      if (i === currentPage + showPages && currentPage + showPages < totalPages - 1) {
        range.push('...');
      }
    }
  
    // Always add last page if not already included
    if (totalPages > 1 && !range.includes(totalPages)) {
      range.push(totalPages);
    }
  
    return (
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        
        {range.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="ellipsis">...</span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          )
        ))}
  
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Sau
        </button>
      </div>
    );
  };

  return (
    <div className="user-management">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
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
                  placeholder="Tìm kiếm theo tên, email, họ tên..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                />
              </div>
              <div className="role-filter">
                <select 
                  className="form-select" 
                  value={roleFilter}
                  onChange={(e) => {
                    setRoleFilter(e.target.value);
                    setCurrentPage(1); // Reset to first page when filter changes
                  }}
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
              <button className="btn btn-secondary" onClick={handleExport}>
                Xuất file
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
                <tr key={user.user_id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.full_name}</td>
                  <td>{user.role_name}</td>
                  <td className="action-buttons-admin">
                    <MdEditNote className="edit-icon-admin me-4 ms-3" />
                    <FaTrash 
                      className="delete-icon-admin md-2" 
                      onClick={() => handleDeleteUser(user.user_id)} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {renderPagination()}

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Thêm tài khoản mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  />
                </Form.Group>
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
                    type="password"
                    placeholder="Mật khẩu"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Select 
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  >
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
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
      )}
    </div>
  );
};

export default UserManagement;