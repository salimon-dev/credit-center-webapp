import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Card, Col, Descriptions, Row, Typography } from "antd";

export default function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }
  return (
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
                  <Typography.Text copyable>{user.secretToken}</Typography.Text>
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24}>
        <Card title="Transactions">transactions you here</Card>
      </Col>
    </Row>
  );
}
