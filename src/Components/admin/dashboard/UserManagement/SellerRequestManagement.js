import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import { MdEditNote } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const SellerRequestManagement = ({ toggleManagementView }) => {
  const [requests, setRequests] = useState(
    Array.from({ length: 20 }, (_, index) => {
      const today = new Date();
      const requestDate = new Date(today.setDate(today.getDate() - index));
      return {
        id: index + 1,
        username: `user${index + 1}`,
        email: `user${index + 1}@example.com`,
        phone: `098${index}${index}${index}${index}${index}${index}`,
        shopName: `Shop ${index + 1}`,
        requestDate: requestDate.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        status: index % 3 === 0 ? 'pending' : (index % 3 === 1 ? 'approved' : 'rejected')
      };
    })
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pendingRequests, setPendingRequests] = useState(0);

  useEffect(() => {
    const pendingCount = requests.filter(req => req.status === 'pending').length;
    setPendingRequests(pendingCount);
  }, [requests]);

  const filteredRequests = requests.filter(request => {
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesSearch = 
      request.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.shopName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  const handleStatusChange = (requestId, newStatus) => {
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId
          ? { ...request, status: newStatus }
          : request
      )
    );
  };

  return (
    <div className="permission-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Yêu cầu đăng ký Seller</h4>
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="pending">Đang chờ</option>
              <option value="approved">Đã duyệt</option>
              <option value="rejected">Đã từ chối</option>
            </select>
          </div>
        </div>
        <button 
          className="btn btn-secondary"
          onClick={toggleManagementView}
        >
          Quay lại
        </button>
      </div>

      <table className="permission-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Tên shop</th>
            <th>Ngày yêu cầu</th>
            <th>Tình trạng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map(request => (
            <tr key={request.id}>
              <td>{request.username}</td>
              <td>{request.email}</td>
              <td>{request.phone}</td>
              <td>{request.shopName}</td>
              <td>{request.requestDate}</td>
              <td>
                <span className={`status-badge ${request.status}`}>
                  {request.status === 'pending' ? 'Đang chờ' :
                   request.status === 'approved' ? 'Đã duyệt' : 'Đã từ chối'}
                </span>
              </td>
              <td className="action-buttons-admin">
                {request.status === 'pending' && (
                  <>
                    <button 
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleStatusChange(request.id, 'approved')}
                    >
                      Duyệt
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleStatusChange(request.id, 'rejected')}
                    >
                      Từ chối
                    </button>
                  </>
                )}
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
    </div>
  );
};

export default SellerRequestManagement;
