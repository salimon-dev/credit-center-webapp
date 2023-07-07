import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Button, Card, Col, Layout, Row, Space, theme } from "antd";
import Transactions from "./Components/Transactions";
import { Content, Header } from "antd/es/layout/layout";
import Demand from "./Components/TransactionModals/Demand";
import Send from "./Components/TransactionModals/Send";
import Sessions from "./Components/Sessions";
import BasicInfo from "./Components/BasicInfo";
import Services from "./Components/Services";

export default function Profile() {
  const [acitveTab, setActiveTab] = useState("transactions");
  const [openDemand, setOpenDemand] = useState(false);
  const [openSend, setOpenSend] = useState(false);
  const { profile, unauthorize } = useContext(AuthContext);
  const { token } = theme.useToken();
  if (!profile) {
    return null;
  }
  return (
    <Layout className="layout">
      <Demand
        open={openDemand}
        onClose={() => {
          setOpenDemand(false);
        }}
      />
      <Send
        open={openSend}
        onClose={() => {
          setOpenSend(false);
        }}
      />
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Space>
          <Button
            onClick={() => {
              setOpenSend(true);
            }}
            type="text"
            style={{ color: token.colorBgLayout }}
          >
            Transfer credit
          </Button>
          <Button
            onClick={() => {
              setOpenDemand(true);
            }}
            type="text"
            style={{ color: token.colorBgLayout }}
          >
            Demand credit
          </Button>
          <Button
            onClick={() => {
              setOpenDemand(true);
            }}
            type="text"
            style={{ color: token.colorBgLayout }}
          >
            Register service
          </Button>
        </Space>
        <Space style={{ marginLeft: "auto" }}>
          <Button
            type="text"
            style={{ color: token.colorBgContainer }}
            onClick={unauthorize}
          >
            Logout
          </Button>
        </Space>
      </Header>
      <Content
        style={{ minHeight: "calc(100vh - 64px)", padding: "24px 50px" }}
      >
        <Row gutter={[0, 12]}>
          <Col xs={24}>
            <BasicInfo />
          </Col>
          <Col xs={24}>
            <Card
              tabList={[
                { key: "transactions", label: "Transactions" },
                { key: "sessions", label: "Sessions" },
                { key: "services", label: "Services" },
              ]}
              activeTabKey={acitveTab}
              onTabChange={setActiveTab}
            >
              {acitveTab === "transactions" && <Transactions />}
              {acitveTab === "sessions" && <Sessions />}
              {acitveTab === "services" && <Services />}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
