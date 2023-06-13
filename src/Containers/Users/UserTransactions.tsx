import { Button, Card, Col, Popconfirm, Row, Space, Table } from "antd";
import { useQuery } from "react-query";
import { useContext, useState } from "react";
import { AuthContext, useAxios } from "../../Providers/AuthProvider";
import { tsToDate } from "../../utils";
import {
  declineTransaction,
  extecuteTransaction,
  searchTransactions,
} from "../../Rest/transactions";
import { ITransaction } from "../../structs";
import TransactionStatus from "../../Components/TransactionStatus";

const pageSize = 10;
interface IProps {
  address: string;
}
export default function UserTransactions({ address }: IProps) {
  const { user } = useContext(AuthContext);
  const axios = useAxios();
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery(
    ["transactions", address, page],
    () => {
      return searchTransactions({ address, page, pageSize }, axios);
    }
  );

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
      status: <TransactionStatus>{item.status}</TransactionStatus>,
      executedAt: item.executedAt ? tsToDate(item.executedAt) : "-",
      actions: actions(item),
    }));
  }

  return (
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
  );
}
