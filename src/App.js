import React from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import RouterCustom from "./Router";
import { CartProvider } from "./Components/Body/CartContext";

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <RouterCustom />
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;