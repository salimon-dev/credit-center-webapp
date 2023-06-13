import { Button, Card, Col, Popconfirm, Row, Space, Table, Tag } from "antd";
import { useQuery } from "react-query";
import {
  declineTransaction,
  extecuteTransaction,
  searchTransactions,
} from "../../Rest/transactions";
import { useContext, useState } from "react";
import { AuthContext, useAxios } from "../../Providers/AuthProvider";
import { tsToDate } from "../../utils";
import { ITransaction } from "../../structs";

interface IStatuTagProps {
  children: string;
}
function StatusTag({ children }: IStatuTagProps) {
  switch (children) {
    case "pending":
      return (
        <Tag style={{ minWidth: 75, textAlign: "center" }} color="yellow">
          Pending
        </Tag>
      );
    case "executed":
      return (
        <Tag style={{ minWidth: 75, textAlign: "center" }} color="green">
          Executed
        </Tag>
      );
    case "declined":
      return (
        <Tag style={{ minWidth: 75, textAlign: "center" }} color="red">
          Declined
        </Tag>
      );
  }
  return (
    <Tag style={{ minWidth: 75, textAlign: "center" }}>
      {children.toUpperCase()}
    </Tag>
  );
}

const pageSize = 10;
export default function Transactions() {
  const axios = useAxios();
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery(["transactions", page], () => {
    return searchTransactions({ page, pageSize }, axios);
  });

  function dataSource() {
    if (isLoading || !data) return;
    function actions(item: ITransaction) {
      if (!user) return null;
      if (item.status === "pending") {
        if (item.from._id === user._id) {
          return (
            <Space>
              <Popconfirm
                title="execute this transaction"
                okText="yes"
                description={`by executing this transaction you send ${item.amount} to ${item.to.name} and pay ${item.fee} as fee to it.`}
                onConfirm={async () => {
                  await extecuteTransaction(item._id, axios);
                  refetch();
                }}
              >
                <Button size="small" type="primary">
                  Execute
                </Button>
              </Popconfirm>
              <Popconfirm
                title="decline this transaction"
                okText="yes"
                description="are you sure you want to decline this transaction?"
                onConfirm={async () => {
                  await declineTransaction(item._id, axios);
                  refetch();
                }}
              >
                <Button size="small">Decline</Button>
              </Popconfirm>
            </Space>
          );
        }
      }
    }
    return data.data.map((item, index) => ({
      key: item._id,
      num: (page - 1) * pageSize + index + 1,
      from: item.from.name,
      to: item.to.name,
      amount: item.amount,
      fee: item.fee,
      createdAt: tsToDate(item.createdAt),
      status: <StatusTag>{item.status}</StatusTag>,
      executedAt: item.executedAt ? tsToDate(item.executedAt) : "-",
      actions: actions(item),
    }));
  }

  return (
    <Row gutter={[0, 12]} style={{ justifyContent: "center" }}>
      <Col xs={24} md={22} lg={22} xl={20}>
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
                  { dataIndex: "status", key: "status", title: "Status" },
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
                  {
                    dataIndex: "actions",
                    key: "actions",
                    title: "Actions",
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
