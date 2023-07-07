import { Button, Col, Form, Input, Modal, Row, Space, Typography } from "antd";
import { register } from "../Rest/users";
import { AuthContext } from "../Providers/AuthProvider";
import { useContext } from "react";
import { AxiosError } from "axios";
import { useForm } from "antd/es/form/Form";

interface IProps {
  open: boolean;
  onClose: () => void;
}
export default function RegisterDialog({ onClose, open }: IProps) {
  const { setUser, user } = useContext(AuthContext);
  const [form] = useForm();
  async function submit({ name }: { name: string }) {
    try {
      const result = await register(name);
      setUser(result.user);
    } catch (e) {
      const error = e as AxiosError;
      if (error.response) {
        if (error.response.status === 422) {
          const { errors } = error.response.data as {
            errors: { field: string; message: string }[];
          };
          console.log(errors);
          for (let i = 0; i < errors.length; i++) {
            form.setFields([
              { name: errors[i].field, errors: [errors[i].message] },
            ]);
          }
        }
      }
      console.log(e);
    }
  }
  return (
    <Modal open={open} title="Register" footer={null} onCancel={onClose}>
      <Form layout="vertical" onFinish={submit} form={form}>
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "name is required" },
                {
                  pattern: /^[a-z0-9]+$/g,
                  message: "name only can containe lowercase chars and number",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          {user && (
            <>
              <Col xs={24}>
                <Typography.Text>
                  This is your secret token, please keep it safe and secure and
                  do not expose it. nobody except you have this token right now.
                  you'll need it whenever you want to login here. please keep in
                  mind that no other services are allowed to request your secret
                  token
                </Typography.Text>
              </Col>
              <Col xs={24}>
                <Typography.Text code>{user.secretToken}</Typography.Text>
              </Col>
            </>
          )}
          {!user && (
            <Col xs={24} style={{ textAlign: "right" }}>
              <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Space>
            </Col>
          )}
          {user && (
            <Col xs={24} style={{ textAlign: "right" }}>
              <Space>
                <Button onClick={onClose}>
                  I copied the secret token somewhere safe.
                </Button>
              </Space>
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  );
}
