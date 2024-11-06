/** @format */

import React from "react";
import "./Checkout.css";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";

const Checkout = () => {
  return (
    <>
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
    </>
  );
};

export default Checkout;
