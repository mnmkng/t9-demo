import React from "react";
import { Layout } from "antd";
import "./Layout.css"

import Header from "./Header";


const { Content } = Layout;

export default ({ children }) => (
  <div>
    <Layout>
      <Header/>
      <Content className="content-wrapper">
        {children}
      </Content>
    </Layout>
  </div>
);
