import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useContext, useState } from "react";
import { AuthContext, useAxios } from "../../Providers/AuthProvider";
import { login } from "../../Rest/users";
import { AxiosError } from "axios";
interface IStep0Props {
  next: () => void;
}
function Step0({ next }: IStep0Props) {
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
      next();
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
    <>
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
                  { required: true, message: "secret token is required" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} style={{ textAlign: "right" }}>
              <Button htmlType="submit" type="primary" loading={submitting}>
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </>
  );
}

function Step1() {
  const { user } = useContext(AuthContext);
  if (!user) return null;
  return (
    <Col xs={24}>
      <Typography.Text>Welcome {user.name}!</Typography.Text>
    </Col>
  );
}

export default function Login() {
  const [step, setStep] = useState(0);
  return (
    <Card title="Login">
      <Row gutter={[12, 12]}>
        {step === 0 && (
          <Step0
            next={() => {
              setStep(step + 1);
            }}
          />
        )}
        {step === 1 && <Step1 />}
      </Row>
    </Card>
  );
}
