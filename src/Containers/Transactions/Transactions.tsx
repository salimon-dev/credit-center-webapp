import { Card, Col, Row, Table } from "antd";
import { useQuery } from "react-query";
import { searchTransactions } from "../../Rest/transactions";
import { useState } from "react";
import { useAxios } from "../../Providers/AuthProvider";
import { tsToDate } from "../../utils";

const pageSize = 10;
export default function Transactions() {
  const axios = useAxios();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(["transactions", page], () => {
    return searchTransactions({ page, pageSize }, axios);
  });

  function dataSource() {
    if (isLoading || !data) return;
    return data.data.map((item, index) => ({
      num: (page - 1) * pageSize + index + 1,
      from: item.from.name,
      to: item.to.name,
      amount: item.amount,
      fee: item.fee,
      createdAt: tsToDate(item.createdAt),
      executedAt: item.executedAt ? tsToDate(item.executedAt) : "-",
    }));
  }

  return (
    <Row gutter={[0, 12]} style={{ justifyContent: "center" }}>
      <Col xs={24} md={20} lg={18} xl={16}>
        <Card title="Transactions">
          <Row gutter={[12, 12]}>
            <Col xs={24}>
              <Table
                loading={isLoading}
                pagination={{
                  pageSize,
                  current: page,
                  total: (data || { meta: { total: 0 } }).meta.total,
                  onChange: setPage,
                }}
                columns={[
                  { dataIndex: "num", key: "num", title: "#" },
                  { dataIndex: "from", key: "from", title: "From" },
                  { dataIndex: "to", key: "to", title: "To" },
                  { dataIndex: "amount", key: "amount", title: "Amount" },
                  { dataIndex: "fee", key: "fee", title: "Fee" },
                  {
                    dataIndex: "createdAt",
                    key: "createdAt",
                    title: "Created at",
                  },
                  {
                    dataIndex: "executedAt",
                    key: "executedAt",
                    title: "Executed at",
                  },
                ]}
                dataSource={dataSource()}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
