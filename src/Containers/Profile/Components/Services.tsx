import { Button, Col, Popconfirm, Row, Space, Table } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { IService } from "../../../structs";
import { tsToDate } from "../../../utils";
import { removeService, searchServices } from "../../../Rest/services";
import CreateServiceModal from "./ServiceModals/CreateService";
import EditServiceModal from "./ServiceModals/EditService";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const pageSize = 10;
export default function Services() {
  const [page, setPage] = useState(1);
  const [openCreateService, setOpenCreateService] = useState(false);
  const [editingService, setEditingService] = useState<IService>();
  const { data, isLoading, refetch } = useQuery(["services", page], () => {
    return searchServices({ page, pageSize });
  });

  function dataSource() {
    if (isLoading || !data) return;
    function actions(item: IService) {
      return (
        <Space>
          <Button
            size="small"
            type="text"
            onClick={() => {
              setEditingService(item);
            }}
            shape="circle"
            icon={<EditOutlined />}
          />
          <Popconfirm
            title="Remove service"
            description="Are you sure you want to remove this service?"
            onConfirm={async () => {
              await removeService(item._id);
              refetch();
            }}
          >
            <Button
              size="small"
              type="text"
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
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
      <CreateServiceModal
        open={openCreateService}
        onClose={() => {
          setOpenCreateService(false);
        }}
      />
      {editingService && (
        <EditServiceModal
          record={editingService}
          open={true}
          onClose={() => {
            setEditingService(undefined);
          }}
        />
      )}
      <Col xs={24} style={{ textAlign: "right" }}>
        <Button
          onClick={() => {
            setOpenCreateService(true);
          }}
        >
          + Register new service
        </Button>
      </Col>
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
            { dataIndex: "actions", key: "actions", title: "actions" },
          ]}
          dataSource={dataSource()}
        />
      </Col>
    </Row>
  );
}
