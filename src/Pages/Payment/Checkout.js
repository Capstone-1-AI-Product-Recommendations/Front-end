/** @format */

import React from "react";
import "./Checkout.css"; // Make sure the CSS is properly linked
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";

const Checkout = () => {
  return (
    <>
      <Header /> {/* Header component added correctly */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "24px",
          marginLeft: "220px",
          marginRight: "220px",
        }}
      >
        <AddressForm />
        <OrderSummary />
      </div>
      <Footer /> {/* Footer component added correctly */}
    </>
  );
};

export default Checkout;
