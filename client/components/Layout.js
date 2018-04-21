import Link from "next/link";
import Head from "next/head";
import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer } = Layout;

export default ({ children }) => (
  <div>
    <Head>
      <title>T9</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="/_next/static/style.css" />
    </Head>

    <Layout>
      <Header style={{background: "#fff"}}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">
            <Link href="/">
              <a>Home</a>
            </Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link href="/signup">
              <a>Register</a>
            </Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Menu.Item>
        </Menu>
      </Header>

      <Content>
        <style jsx global>{`
          body {
          }
        `}</style>
        {children}
      </Content>

      <Footer>This is a footer!</Footer>
    </Layout>
  </div>
);
