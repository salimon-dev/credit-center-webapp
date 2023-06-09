import { Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Route, Routes, useMatch, useNavigate } from "react-router-dom";
import Home from "./Containers/Home/Home";
import Transactions from "./Containers/Transactions/Transactions";
import Users from "./Containers/Users/Users";

export default function App() {
  const navigate = useNavigate();

  const defaultKey = [];

  const isHome = useMatch("/");
  const isUsers = useMatch("/users");
  const isTransactions = useMatch("/transactions");
  if (isTransactions) {
    defaultKey.push("transactions");
  } else if (isUsers) {
    defaultKey.push("users");
  } else if (isHome) {
    defaultKey.push("home");
  }
  return (
    <Layout className="layout">
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={defaultKey}
          items={[
            {
              key: "home",
              label: "Home",
              onClick: () => {
                navigate("/");
              },
            },
            {
              key: "users",
              label: "Users",
              onClick: () => {
                navigate("/users");
              },
            },
            {
              key: "transactions",
              label: "Transactions",
              onClick: () => {
                navigate("/transactions");
              },
            },
          ]}
        />
      </Header>
      <Content style={{ minHeight: "calc(100vh - 64px)", padding: 24 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </Content>
    </Layout>
  );
}
