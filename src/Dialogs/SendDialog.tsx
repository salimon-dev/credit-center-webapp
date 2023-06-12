import { Button, Col, Form, Input, Modal, Row, Space } from "antd";
import { useAxios } from "../Providers/AuthProvider";
import { sendBalance } from "../Rest/transactions";
import { useState } from "react";

interface IProps {
  open: boolean;
  onClose: () => void;
}
export default function SendDialog({ onClose, open }: IProps) {
  const axios = useAxios();
  const [submitting, setSubmitting] = useState(false);
  async function submit(values: { to: string; amount: number }) {
    try {
      setSubmitting(true);
      await sendBalance(values, axios);
      onClose();
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Modal open={open} onCancel={onClose} footer={null}>
      <Form layout="vertical" onFinish={submit}>
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Form.Item name="to" label="Address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col xs={24} style={{ textAlign: "right" }}>
            <Space>
              <Button>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Send
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
