import React from "react";
import { Layout } from "antd";

import Header from "./Header";


const { Content, Footer } = Layout;

export default ({ children }) => (
  <div>
    <Layout>
      <Header/>
      <Content>
        {children}
      </Content>
      <Footer>This is a footer!</Footer>
    </Layout>
  </div>
);
