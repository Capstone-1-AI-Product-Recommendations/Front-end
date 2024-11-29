/** @format */

import React from "react";
import "./Checkout.css";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";

const Checkout = () => {
  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <AddressForm />
        <OrderSummary />
      </div>
    </div>
  );
};

export default Checkout;
