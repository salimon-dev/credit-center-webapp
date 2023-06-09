import { Card, Col, Row, Table } from "antd";

export default function Users() {
  return (
    <Row gutter={[0, 12]} style={{ justifyContent: "center" }}>
      <Col xs={24} md={20} lg={18} xl={16}>
        <Card title="Users">
          <Row gutter={[12, 12]}>
            <Col xs={24}>
              <Table
                columns={[
                  { dataIndex: "num", key: "num", title: "#" },
                  { dataIndex: "name", key: "name", title: "Name" },
                  { dataIndex: "score", key: "score", title: "Score" },
                  { dataIndex: "balance", key: "balance", title: "Balance" },
                  { dataIndex: "registered", key: "registered", title: "Registered at" },
                ]}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
