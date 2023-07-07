import { Button, Col, Row, Space, Table } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { IService } from "../../../structs";
import { tsToDate } from "../../../utils";
import { searchServices } from "../../../Rest/services";

const pageSize = 10;
export default function Services() {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery(["transactions", page], () => {
    return searchServices({ page, pageSize });
  });

  function dataSource() {
    if (isLoading || !data) return;
    function actions(item: IService) {
      return (
        <Space>
          <Button size="small" type="primary">
            Execute
          </Button>
          <Button size="small">Decline</Button>
        </Space>
      );
    }
    return data.data.map((item, index) => ({
      key: item._id,
      num: (page - 1) * pageSize + index + 1,
      title: item.title,
      homePage: item.homePage,
      type: item.type,
      updatedAt: tsToDate(item.updatedAt),
      createdAt: tsToDate(item.createdAt),
      actions: actions(item),
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
            { dataIndex: "title", key: "title", title: "title" },
            { dataIndex: "type", key: "type", title: "type" },
            { dataIndex: "homePage", key: "homePage", title: "homePage" },
            {
              dataIndex: "createdAt",
              key: "createdAt",
              title: "Created at",
            },
            {
              dataIndex: "updatedAt",
              key: "updatedAt",
              title: "Updated at",
            },
          ]}
          dataSource={dataSource()}
        />
      </Col>
    </Row>
  );
}
