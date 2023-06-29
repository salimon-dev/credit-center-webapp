import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Space,
  Typography,
} from "antd";
import { useContext, useState } from "react";
import { AuthContext, useAxios } from "../Providers/AuthProvider";
import { login } from "../Rest/users";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const axios = useAxios();
  const { setUser } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  async function submit({
    name,
    secretToken,
  }: {
    name: string;
    secretToken: string;
  }) {
    try {
      setSubmitting(true);
      const result = await login({ name, secretToken }, axios);
      setUser(result.user);
    } catch (e) {
      const error = e as AxiosError;
      if (error.response) {
        if (error.response.status === 422) {
          const { errors } = error.response.data as {
            errors: { field: string; message: string }[];
          };
          for (let i = 0; i < errors.length; i++) {
            form.setFields([
              { name: errors[i].field, errors: [errors[i].message] },
            ]);
          }
        }
      }
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Layout>
      <Layout.Content>
        <Row
          gutter={[0, 12]}
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
          }}
        >
          <Col xs={22} md={20} lg={18} xl={16} xxl={12}>
            <Card title="Login">
              <Row gutter={[12, 12]}>
                <Col xs={24}>
                  <Typography.Text>
                    please login with your address and secret token here:
                  </Typography.Text>
                </Col>
                <Col xs={24}>
                  <Form layout="vertical" onFinish={submit} form={form}>
                    <Row>
                      <Col xs={24}>
                        <Form.Item
                          name="name"
                          label="Name"
                          rules={[
                            { required: true, message: "name is required" },
                            {
                              pattern: /^[a-z0-9]+$/g,
                              message:
                                "name only can containe lowercase chars and number",
                            },
                          ]}
                        >
                          <Input placeholder="john" addonAfter="@salimon.io" />
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item
                          name="secretToken"
                          label="Secret token"
                          rules={[
                            {
                              required: true,
                              message: "secret token is required",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} style={{ textAlign: "right" }}>
                        <Space>
                          <Button
                            htmlType="submit"
                            type="text"
                            onClick={() => {
                              navigate("/");
                            }}
                          >
                            Register new account
                          </Button>
                          <Button
                            htmlType="submit"
                            type="primary"
                            loading={submitting}
                          >
                            Login
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}
