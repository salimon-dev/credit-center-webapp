import { Button, Col, Form, Input, Modal, Row, Space } from "antd";
import { register } from "../Rest/users";
import { AuthContext, useAxios } from "../Providers/AuthProvider";
import { useContext } from "react";

interface IProps {
  open: boolean;
  onClose: () => void;
}
export default function RegisterDialog({ onClose, open }: IProps) {
  const axios = useAxios();
  const { setUser } = useContext(AuthContext);
  async function submit({ name }: { name: string }) {
    try {
      const result = await register(name, axios);
      setUser(result.user);
      onClose();
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Modal open={open} title="Register" footer={null} onCancel={onClose}>
      <Form layout="vertical" onFinish={submit}>
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} style={{ textAlign: "right" }}>
            <Space>
              <Button>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
