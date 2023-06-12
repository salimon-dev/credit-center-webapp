import { Card, Col, Row } from "antd";

export default function Home() {
  return (
    <Row gutter={[12, 12]}>
      <Col xs={24}>
        <Card title="Salimon Official Credit Center">
          <Row gutter={[12, 12]}>
            <Col>this is salimon official credit center</Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
