import { Col, Row, Table } from "antd";
import { useAxios } from "../../../Providers/AuthProvider";
import { useState } from "react";
import { useQuery } from "react-query";
import { tsToDate } from "../../../utils";
import { searchSessions } from "../../../Rest/sessions";

const pageSize = 10;
export default function Sessions() {
  const axios = useAxios();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(["sessions", page], () => {
    return searchSessions({ page, pageSize }, axios);
  });

  function dataSource() {
    if (isLoading || !data) return;
    return data.data.map((item, index) => ({
      key: item._id,
      num: (page - 1) * pageSize + index + 1,
      from: item.hostUser.name,
      token: item.token,
      description: item.description,
      createdAt: tsToDate(item.createdAt),
      status: item.status,
    }));
  }
  return (
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
            { dataIndex: "from", key: "from", title: "Issued from" },
            { dataIndex: "token", key: "token", title: "Token" },
            {
              dataIndex: "description",
              key: "description",
              title: "Description",
            },
            { dataIndex: "status", key: "status", title: "status" },
            { dataIndex: "createdAt", key: "createdAt", title: "Issued at" },
          ]}
          dataSource={dataSource()}
        />
      </Col>
    </Row>
  );
}
