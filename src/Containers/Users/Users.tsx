import { Card, Col, Row, Table } from "antd";
import { useQuery } from "react-query";
import { useState } from "react";
import { useAxios } from "../../Providers/AuthProvider";
import { searchUsers } from "../../Rest/users";
import { tsToDate } from "../../utils";

const pageSize = 10;
export default function Users() {
  const axios = useAxios();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(["users", page], () => {
    return searchUsers({ page, pageSize }, axios);
  });

  function dataSource() {
    if (isLoading || !data) return;
    return data.data.map((item, index) => ({
      num: (page - 1) * pageSize + index + 1,
      name: item.name,
      score: item.score,
      balance: item.balance,
      registeredAt: tsToDate(item.registeredAt),
    }));
  }

  return (
    <Row gutter={[0, 12]} style={{ justifyContent: "center" }}>
      <Col xs={24} md={20} lg={18} xl={16}>
        <Card title="Users">
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
                  { dataIndex: "name", key: "name", title: "Name" },
                  { dataIndex: "score", key: "score", title: "Score" },
                  { dataIndex: "balance", key: "balance", title: "Balance" },
                  {
                    dataIndex: "registeredAt",
                    key: "registeredAt",
                    title: "Registered at",
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
