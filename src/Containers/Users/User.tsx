import { Button, Card, Col, Row, Space, Spin, Typography } from "antd";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fecthUser } from "../../Rest/users";
import { useAxios, useIsLoggedIn } from "../../Providers/AuthProvider";
import UserTransactions from "./UserTransactions";

export default function User() {
  const navigate = useNavigate();
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
      <Col xs={24} md={22} lg={22} xl={22}>
        <Card title={user.name}>
          <Row gutter={[12, 12]}>
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
                  <Button
                    onClick={() => {
                      navigate("/demand?address=" + user._id);
                    }}
                  >
                    Demand credit
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/send?address=" + user._id);
                    }}
                  >
                    Send credit
                  </Button>
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
