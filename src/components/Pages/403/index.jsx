import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";

/**
 * Renders component when page is not accessible
 */
const FourZeroThree = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page OR session expired"
      extra={
        <Link to="/dashboard">
          <Button type="primary" icon={<HomeOutlined />}>Home</Button>
        </Link>
      }
    />
  );
};

export default FourZeroThree;
