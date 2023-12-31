import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "./spinner.scss";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 50,
    }}
    spin
  />
);
const Loader = () => <Spin className="loader" indicator={antIcon} />;
export default Loader;
