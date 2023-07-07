import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { editService } from "../../../../Rest/services";
import { IService } from "../../../../structs";
import { useQueryClient } from "react-query";

interface IProps {
  open: boolean;
  onClose: () => void;
  record: IService;
}

export default function EditServiceModal({ open, onClose, record }: IProps) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [submitting, setSubmitting] = useState(false);
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Register new service"
      footer={null}
    >
      <Form
        layout="vertical"
        initialValues={{
          title: record.title,
          description: record.description,
          baseUrl: record.baseUrl,
          homePage: record.homePage,
          terms: record.terms,
          type: record.type,
          secretToken: record.secretToken,
        }}
        form={form}
        onFinish={async (values) => {
          try {
            setSubmitting(true);
            await editService(record._id, values);
            onClose();
            queryClient.refetchQueries("services");
          } catch (error) {
            console.log(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Form.Item
              name="title"
              label="title"
              rules={[{ required: true, message: "please enter the title" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="description"
              label="description"
              rules={[
                { required: true, message: "please enter the description" },
              ]}
            >
              <TextArea />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="homePage" label="home page url">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="terms" label="terms and policy page url">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="baseUrl"
              label="Base Url (API endpoints)"
              rules={[
                { required: true, message: "please enter then base url" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="type"
              label="Service Type"
              rules={[
                { required: true, message: "please define your service type" },
              ]}
            >
              <Select
                options={[
                  { label: "Chat Service (0.00.0)", value: "chat0" },
                  { label: "Custom Service", value: "custom" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="secretToken"
              label="Secret Token"
              rules={[
                {
                  required: true,
                  message: "please enter the service secret token",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Submit
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
