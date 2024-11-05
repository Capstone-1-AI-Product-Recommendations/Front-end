// src/App.js
/** @format */
import React from "react";
import { CartProvider } from "./Components/Cart/CartContext"; // Đường dẫn tới CartContext
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import RouterCustom from "./Router";

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
