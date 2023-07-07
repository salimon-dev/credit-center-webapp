import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Card, Col, Descriptions, Row } from "antd";
import { getEnv } from "../../../utils";

export default function BasicInfo() {
  const { profile } = useContext(AuthContext);
  if (!profile) {
    return null;
  }
  return (
    <Card title={profile.name}>
      <Row gutter={[12, 12]}>
        <Col xs={24}>
          <Descriptions>
            <Descriptions.Item label="Address">
              {profile.name}@{getEnv("SOURCE")}
            </Descriptions.Item>
            <Descriptions.Item label="Balance">
              {profile.balance} bp
            </Descriptions.Item>
            <Descriptions.Item label="Score">
              {profile.score} sp
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
}
