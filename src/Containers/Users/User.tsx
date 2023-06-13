import { Button, Card, Col, Row, Space, Spin, Typography } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fecthUser } from "../../Rest/users";
import { useAxios, useIsLoggedIn } from "../../Providers/AuthProvider";
import UserTransactions from "./UserTransactions";

export default function User() {
  const isLoggedIn = useIsLoggedIn();
  const axios = useAxios();
  const { id } = useParams() as { id: string };
  const { data: user, isLoading } = useQuery(["user", id], () => {
    return fecthUser(id, axios);
  });

  if (isLoading || !user) {
    return (
      <Row gutter={[0, 12]}>
        <Col xs={24}>
          <Spin
            size="large"
            tip="Loading user info..."
            style={{ marginTop: 68 }}
          >
            <div className="content" />
          </Spin>
        </Col>
      </Row>
    );
  }
  return (
    <Row gutter={[0, 12]} style={{ justifyContent: "center" }}>
      <Col xs={24} md={20} lg={18} xl={16}>
        <Card title={user.name}>
          <Row>
            <Col xs={24} md={8}>
              <Typography.Text>Address:</Typography.Text>
              <Typography.Text code>{user._id}</Typography.Text>
            </Col>
            <Col xs={24} md={8}>
              <Typography.Text>Balance:</Typography.Text>
              <Typography.Text code>{user.balance}</Typography.Text>
            </Col>
            <Col xs={24} md={8}>
              <Typography.Text>Score:</Typography.Text>
              <Typography.Text code>{user.score}</Typography.Text>
            </Col>
            {isLoggedIn && (
              <Col xs={24} style={{ textAlign: "right" }}>
                <Space>
                  <Button>Demand credit</Button>
                  <Button>Send credit</Button>
                </Space>
              </Col>
            )}
          </Row>
        </Card>
      </Col>
      <UserTransactions address={id} />
    </Row>
  );
}
