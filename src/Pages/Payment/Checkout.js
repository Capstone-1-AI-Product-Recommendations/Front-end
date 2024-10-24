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
      <Header />
      <div
        style={{
          display: "flex",
          gap: "100px",
          padding: "20px",
          marginLeft: "200px",
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
