/** @format */

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FeatureSection from "./FeatureSection";

const MainFeatureArea = () => {
  const features = [
    {
      iconUrl: "https://via.placeholder.com/56",
      title: "Chỉ thanh toán trực tuyến",
      description: "Nhanh, an toàn, tiện lợi – thanh toán chỉ trong vài giây.",
    },
    {
      iconUrl: "https://via.placeholder.com/56",
      title: "Sản phẩm mới và khuyến mãi",
      description: "Ưu đãi sốc mỗi ngày – săn ngay sản phẩm mới nhất!",
    },
    {
      iconUrl: "https://via.placeholder.com/56",
      title: "Đảm bảo chất lượng",
      description: "Chất lượng đỉnh cao – bạn luôn yên tâm mua sắm.",
    },
  ];

  return (
    <Container fluid>
      <Row>
        {features.map((feature, index) => (
          <Col key={index} sm={12} md={4}>
            <FeatureSection
              iconUrl={feature.iconUrl}
              title={feature.title}
              description={feature.description}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MainFeatureArea;
