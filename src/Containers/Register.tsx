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
import { register } from "../Rest/users";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { getEnv } from "../utils";
export default function Register() {
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
            <Card title="Register">
              <Row gutter={[12, 12]}>
                <Col xs={24}>
                  <Typography.Text>
                    to register here, you need to pick a unique name for
                    yourself. it's the first step to join the network. so please
                    be careful since you have to share your name with others and
                    pick a good one.
                  </Typography.Text>
                </Col>
                <Col xs={24}>
                  <Form
                    layout="vertical"
                    onFinish={async (values) => {
                      try {
                        setSubmitting(true);
                        const result = await register(values);
                        console.log(result);
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
                            console.log(errors);
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
                    initialValues={{ secretToken: uuidV4() + "-" + uuidV4() }}
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
                        <Form.Item name="password" label="Password">
                          <Input.Password placeholder="password" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} style={{ textAlign: "right" }}>
                        <Space>
                          <Button
                            type="text"
                            onClick={() => {
                              navigate("/login");
                            }}
                          >
                            I've already registered
                          </Button>
                          <Button
                            htmlType="submit"
                            type="primary"
                            loading={submitting}
                          >
                            Register
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
