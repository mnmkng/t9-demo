import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

export default ({ children }) => (
  <div>
    <Layout>
      <Header style={{background: "#fff"}}>
        <Menu
          mode="horizontal"
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">
            <Link to="/">
              Default
            </Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link to="/phone">
              Phone
            </Link>
          </Menu.Item>

        </Menu>
      </Header>

      <Content>
        {children}
      </Content>

      <Footer>This is a footer!</Footer>
    </Layout>
  </div>
);
