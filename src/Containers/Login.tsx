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
import { AuthContext } from "../Providers/AuthProvider";
import { login } from "../Rest/users";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { getEnv } from "../utils";

export default function Login() {
  const navigate = useNavigate();
  const { authorize } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
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
                  <Form
                    layout="vertical"
                    onFinish={async (values) => {
                      try {
                        setSubmitting(true);
                        const result = await login(values);
                        authorize(
                          result.user,
                          result.accessToken,
                          result.expiresAt
                        );
                      } catch (e) {
                        const error = e as AxiosError;
                        if (error.response) {
                          if (error.response.status === 422) {
                            const { errors } = error.response.data as {
                              errors: { field: string; message: string }[];
                            };
                            for (let i = 0; i < errors.length; i++) {
                              form.setFields([
                                {
                                  name: errors[i].field,
                                  errors: [errors[i].message],
                                },
                              ]);
                            }
                          }
                        }
                        console.log(e);
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    form={form}
                  >
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
                          <Input
                            placeholder="john"
                            addonAfter={getEnv("SOURCE")}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item
                          name="password"
                          label="Password"
                          rules={[
                            {
                              required: true,
                              message: "password is required",
                            },
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </Col>
                      <Col xs={24} style={{ textAlign: "right" }}>
                        <Space>
                          <Button
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
