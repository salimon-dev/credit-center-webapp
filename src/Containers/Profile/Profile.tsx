import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Layout,
  Row,
  Space,
  Typography,
  theme,
} from "antd";
import Transactions from "./Components/Transactions";
import { Content, Header } from "antd/es/layout/layout";
import Demand from "./Components/Demand";
import Send from "./Components/Send";

export default function Profile() {
  const [openDemand, setOpenDemand] = useState(false);
  const [openSend, setOpenSend] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const { token } = theme.useToken();
  if (!user) {
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
        </Space>
        <Space style={{ marginLeft: "auto" }}>
          <Button
            type="text"
            style={{ color: token.colorBgContainer }}
            onClick={() => {
              setUser(undefined);
            }}
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
            <Card title={user.name}>
              <Row gutter={[12, 12]}>
                <Col xs={24}>
                  <Descriptions>
                    <Descriptions.Item label="Address">
                      {user.name}@cc.salimon.io
                    </Descriptions.Item>
                    <Descriptions.Item label="Balance">
                      {user.balance} bp
                    </Descriptions.Item>
                    <Descriptions.Item label="Score">
                      {user.score} sp
                    </Descriptions.Item>
                    <Descriptions.Item label="Secret token">
                      <Typography.Text copyable>
                        {user.secretToken}
                      </Typography.Text>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Card>
          </Col>
          <Transactions />
        </Row>
      </Content>
    </Layout>
  );
}
