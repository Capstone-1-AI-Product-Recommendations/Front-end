import axios from 'axios';
const API_URL = 'http://localhost:8000/api/seller';

export const fetchInventoryData = async (userId) => {
  try {
    console.log("userId", userId);
    const response = await fetch(`${API_URL}/${userId}/products/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.map(product => ({
      sku: product.product_id,
      images: product.images, // Array of images
      name: product.name,
      description: '', // Add description if available
      cost: product.price,
      stock: product.quantity,
      totalValue: product.price * product.quantity,
      recent_date: product.recent_date, // Add recent_date
    }));
  } catch (error) {
    console.error('Error fetching inventory data:', error);
    throw error;
  }
};

export const fetchOrderData = async (userId) => {
  try {
    console.log("userId", userId);
    const response = await fetch(`${API_URL}/orders/${userId}/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("Sản phẩm shop", data); // Log the parsed JSON data
    return data.map(order => ({
      fullName: order.full_name || 'N/A',
      productName: order.product_name || 'N/A', // Corrected property name
      images: order.images || [],
      recentDate: order.recent_date || 'N/A',
      paymentMethod: order.payment_method || 'N/A',
      price: order.price || 0,
      status: order.status || 'N/A',
    }));
  } catch (error) {
    console.error('Error fetching order data:', error);
    throw error;
  }
};

// Hàm gọi API xuất file
export const exportOrders = async (sellerId, fileFormat) => {
  try {
    const response = await axios.get(`${API_URL}/${sellerId}/export_orders/`, {
      responseType: 'blob', // Quan trọng: Nhận dữ liệu dưới dạng blob
    });
    console.log("Exported orders:", response.data); // Log the exported orders
    return response.data; // Trả về nội dung file
  } catch (error) {
    console.error("Error exporting orders:", error);
    throw error;
  }
};

export const fetchSalesSummary = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/sales_summary/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return {
      totalRevenue: data.total_revenue,
      totalOrders: data.total_orders,
      averageOrderValue: data.average_order_value,
    };
  } catch (error) {
    console.error('Error fetching sales summary:', error);
    throw error;
  }
};

export const fetchYearlySalesSummary = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/yearly_sales_summary/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.year;
  } catch (error) {
    console.error('Error fetching yearly sales summary:', error);
    throw error;
  }
};

export const fetchCategoryData = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/categories/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching category data:', error);
    throw error;
  }
};
