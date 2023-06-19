import { Card, Col, Row, Typography } from "antd";
import Register from "./Register";
import Login from "./Login";

export default function Home() {
  return (
    <Row gutter={[12, 12]}>
      <Col xs={24}>
        <Card title="Salimon Official Credit Center">
          <Row gutter={[12, 12]}>
            <Col xs={24}>
              <Typography.Text>
                Welcome to the official credit center of salimon network. a
                credit center is where to authoirze and indentify yourself as a
                user of network. credit centers are responsible for your
                identitaction in network. a unique address will be assigned to
                you (like email addresses) and you can use it to identify
                yourself in other services provided by network. you can add
                balance to your account and pay services or subscriptions from
                here. all services in salimon network need to co-operate with a
                credit center (or CC) to demand payments from users.
              </Typography.Text>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Register />
      </Col>
      <Col xs={24} md={12}>
        <Login />
      </Col>
    </Row>
  );
}
