import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import adminService from "../../../../services/adminService"; // Import adminService
import "./AdminProductManagement.css";

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 10; // Số lượng sản phẩm mỗi trang

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await adminService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleExport = async () => {
    try {
      const fileData = await adminService.exportProducts(); // Call the export API
  
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate
        .getDate()
        .toString()
        .padStart(2, '0')}`; // Format: YYYY-MM-DD
      const fileName = `ProductExport_${formattedDate}.csv`; // Dynamic file name
  
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
      console.error('Failed to export products:', error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.product_id.toString().includes(searchTerm) ||
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.shop_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán dữ liệu phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Hàm đổi trạng thái của đơn hàng
  const getOrderStatusClass = (orderStatus) => {
    switch (orderStatus) {
      case "Chưa xác thực":
        return "status out-of-stock";
      case "Đã xác nhận":
        return "status in-stock";
      case "Đang vận chuyển":
        return "status low-stock";
      default:
        return "status";
    }
  };

  // Hàm đổi trạng thái của giao dịch
  const getTransactionClass = (transaction) => {
    switch (transaction) {
      case "Chưa thanh toán":
        return "status out-of-stock";
      case "Đã thanh toán":
        return "status in-stock";
      default:
        return "status";
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);

    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ margin: "0 5px" }}
        >
          Trước
        </Button>
        {pageNumbers.map((number) => (
          <Button
            key={number}
            onClick={() => setCurrentPage(number)}
            variant={currentPage === number ? "contained" : "outlined"}
            style={{ margin: "0 5px" }}
          >
            {number}
          </Button>
        ))}
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{ margin: "0 5px" }}
        >
          Sau
        </Button>
      </div>
    );
  };

  return (
    <div className="admin-product-management">
      <Typography variant="h5" gutterBottom>
        Quản lý sản phẩm
      </Typography>

      <TextField
        label="Tìm kiếm sản phẩm"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />

      <Button onClick={handleExport} variant="contained" color="primary" style={{ marginBottom: "20px" }}>
        Xuất file
      </Button>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã sản phẩm</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Ảnh</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Giá tiền</TableCell>
              <TableCell>Tên shop</TableCell>
              <TableCell>Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.product_id}>
                <TableCell>{product.product_id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <img src={product.image_file} alt={product.name} />
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price.toLocaleString('vi-VN')} đ</TableCell>
                <TableCell>{product.shop_name}</TableCell>
                <TableCell>
                  <Button>
                    <EditIcon className="edit-icon-ad" />
                  </Button>
                  <Button>
                    <DeleteIcon className="delete-icon-ad" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {renderPagination()}
    </div>
  );
};

export default AdminProductManagement;
