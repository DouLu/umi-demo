import { Breadcrumb, Button, Layout, Menu, Result } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet, useAppData, useNavigate } from "umi";
import logo from "@/assets/yay.jpg";
import styles from "./index.less";
import { buildMenuTree, unaccessible } from "@/routes/router";
import { routesToMenu } from "@/routes";

const items1 = Array.from({ length: 15 }).map((_, index) => ({
  key: index + 1,
  label: `nav${index + 1}`,
}));

export default () => {
  const navigate = useNavigate();

  const year = new Date().getFullYear();
  const { clientRoutes } = useAppData();
  const { children } = clientRoutes[0];
  const items = routesToMenu(children);
  const menuData = buildMenuTree(children);
  if (unaccessible.includes(location.pathname)) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你没有权限访问这个页面！"
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            返回首页
          </Button>
        }
      />
    );
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={{ color: "#fff" }}>
        <Menu
          defaultSelectedKeys={["/"]}
          mode={"inline"}
          theme={"dark"}
          items={menuData}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, color: "#fff" }} className={styles.header}>
          <div style={{ overflow: "hidden" }}>
            <img src={logo} alt="logo" style={{ width: 30, height: 30 }} />
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
          />
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center", fontSize: 20 }}>
          copyright@{year} footer
        </Footer>
      </Layout>
    </Layout>
  );
};
