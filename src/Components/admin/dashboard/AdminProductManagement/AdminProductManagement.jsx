import React, { useState } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import productImage from "../../../../img/Product/newProduct.png";
import productImage1 from "../../../../img/Product/altProductImg2.png";
import productImage2 from "../../../../img/Product/altProductImg1.png";
import "./AdminProductManagement.css";

const AdminProductManagement = () => {
  // Tạo danh sách sản phẩm mẫu (dữ liệu lớn)
  const generateProducts = () =>
    Array.from({ length: 50 }, (_, index) => ({
      id: `P${String(index + 1).padStart(3, "0")}`,
      name: `Sản phẩm ${index + 1}`,
      image:
        index % 3 === 0
          ? productImage
          : index % 3 === 1
          ? productImage1
          : productImage2,
      quantity: Math.floor(Math.random() * 50),
      price: `${(Math.random() * 10 + 5).toFixed(3)}.000 đ`,
      shopName: `Shop ${index % 5 + 1}`,
      orderStatus:
        index % 3 === 0
          ? "Chưa xác thực"
          : index % 3 === 1
          ? "Đã xác nhận"
          : "Đang vận chuyển",
      transaction:
        index % 2 === 0 ? "Chưa thanh toán" : "Đã thanh toán",
    }));

  const [products] = useState(generateProducts());
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Số lượng sản phẩm mỗi trang

  // Tính toán dữ liệu phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

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

  return (
    <div className="admin-product-management">
      <Typography variant="h5" gutterBottom>
        Quản lý sản phẩm
      </Typography>

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
              <TableCell>Tình trạng đơn hàng</TableCell>
              <TableCell>Giao dịch</TableCell>
              <TableCell>Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <img src={product.image} alt={product.name} />
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.shopName}</TableCell>
                <TableCell>
                  <span className={getOrderStatusClass(product.orderStatus)}>
                    {product.orderStatus}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={getTransactionClass(product.transaction)}>
                    {product.transaction}
                  </span>
                </TableCell>
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

      {/* Pagination */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ margin: "0 5px" }}
        >
          Trước
        </Button>
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            variant={currentPage === index + 1 ? "contained" : "outlined"}
            style={{ margin: "0 5px" }}
          >
            {index + 1}
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
    </div>
  );
};

export default AdminProductManagement;
