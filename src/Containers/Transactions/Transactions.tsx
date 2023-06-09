import { Card, Col, Row, Table } from "antd";

export default function Transactions() {
  return (
    <Row gutter={[0, 12]} style={{ justifyContent: "center" }}>
      <Col xs={24} md={20} lg={18} xl={16}>
        <Card title="Transactions">
          <Row gutter={[12, 12]}>
            <Col xs={24}>
              <Table
                columns={[
                  { dataIndex: "num", key: "num", title: "#" },
                  { dataIndex: "from", key: "from", title: "From" },
                  { dataIndex: "to", key: "to", title: "To" },
                  { dataIndex: "amount", key: "amount", title: "Amount" },
                  { dataIndex: "fee", key: "fee", title: "Fee" },
                  { dataIndex: "createdAt", key: "createdAt", title: "Created at" },
                  { dataIndex: "executedAt", key: "executedAt", title: "Executed at" },
                ]}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
