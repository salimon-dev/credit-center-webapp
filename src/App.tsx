import { Button, Layout, Space, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Route, Routes, useMatch, useNavigate } from "react-router-dom";
import Home from "./Containers/Home/Home";
import Transactions from "./Containers/Transactions/Transactions";
import Users from "./Containers/Users/Users";
import { useState } from "react";
import RegisterDialog from "./Dialogs/RegisterDialog";
import { useIsLoggedIn } from "./Providers/AuthProvider";
import ProfileDialog from "./Dialogs/ProfileDialog";
import LoginDialog from "./Dialogs/LoginDialog";
import Send from "./Containers/Transactions/Send";
import Demand from "./Containers/Transactions/Demand";
import User from "./Containers/Users/User";

export default function App() {
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const isLoggedIn = useIsLoggedIn();

  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

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
      <RegisterDialog
        open={openRegister}
        onClose={() => {
          setOpenRegister(false);
        }}
      />
      <LoginDialog
        open={openLogin}
        onClose={() => {
          setOpenLogin(false);
        }}
      />
      <ProfileDialog
        open={openProfile}
        onClose={() => {
          setOpenProfile(false);
        }}
      />
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Space>
          <Button
            onClick={() => {
              navigate("/");
            }}
            type="text"
            style={{ color: token.colorBgLayout }}
          >
            Home
          </Button>
          <Button
            onClick={() => {
              navigate("/users");
            }}
            type="text"
            style={{ color: token.colorBgLayout }}
          >
            Users
          </Button>
          <Button
            onClick={() => {
              navigate("/transactions");
            }}
            type="text"
            style={{ color: token.colorBgLayout }}
          >
            Transactions
          </Button>
        </Space>
        <Space style={{ marginLeft: "auto" }}>
          {!isLoggedIn && (
            <Button
              type="text"
              style={{ color: token.colorBgLayout }}
              onClick={() => {
                setOpenRegister(true);
              }}
            >
              Register
            </Button>
          )}
          {!isLoggedIn && (
            <Button
              type="text"
              onClick={() => {
                setOpenLogin(true);
              }}
              style={{ color: token.colorBgLayout }}
            >
              Login
            </Button>
          )}
          {isLoggedIn && (
            <Button
              type="text"
              style={{ color: token.colorBgLayout }}
              onClick={() => {
                setOpenProfile(true);
              }}
            >
              Profile
            </Button>
          )}
        </Space>
      </Header>
      <Content style={{ minHeight: "calc(100vh - 64px)", padding: 24 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/send" element={<Send />} />
          <Route path="/demand" element={<Demand />} />
        </Routes>
      </Content>
    </Layout>
  );
}
