/** @format */

import React from "react";
import { CartProvider } from "./Components/Cart/CartContext"; // Cập nhật đường dẫn nếu cần
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import RouterCustom from "./Router";
// import ProductList from "./Components/Product/ProductList";

function App() {
  return (
    <CartProvider>
      <Header />
      <RouterCustom />
      <Footer />
    </CartProvider>

  );
}

export default App;
