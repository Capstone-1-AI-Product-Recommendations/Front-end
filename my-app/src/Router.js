// src/Router.js
import React from 'react';
import { Routes } from 'react-router-dom';
import Header from './Components/Header/Header';

const RouterCustom = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* Các route có thể thêm ở đây */}
      </Routes>
    </>
  );
};

export default RouterCustom;