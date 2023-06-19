import { Button, Card, Col, Form, Input, Row, Steps, Typography } from "antd";
import { useContext, useState } from "react";
import { AuthContext, useAxios } from "../../Providers/AuthProvider";
import { register } from "../../Rest/users";
import { AxiosError } from "axios";
interface IStep0Props {
  next: () => void;
}
function Step0({ next }: IStep0Props) {
  const axios = useAxios();
  const { setUser } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  async function submit({ name }: { name: string }) {
    try {
      setSubmitting(true);
      const result = await register(name, axios);
      setUser(result.user);
      next();
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
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <>
      <Col xs={24}>
        <Typography.Text>
          to register here, you need to pick a unique name for yourself. it's
          the first step to join the network. so please be careful since you
          have to share your name with others and pick a good one.
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
            <Col xs={24} style={{ textAlign: "right" }}>
              <Button htmlType="submit" type="primary" loading={submitting}>
                Register
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </>
  );
}

interface IStep1Props {
  next: () => void;
}
function Step1({ next }: IStep1Props) {
  const { user } = useContext(AuthContext);
  if (!user) return null;
  return (
    <>
      <Col xs={24}>
        <Typography.Text>
          you are registered in this service now. you can login to your account
          with your name and secret token. please note that your secret token is
          the only way to login and identify yourself to the credit center. do
          not expose or lose it. there is no way to recover or reset it if you
          lose it.
        </Typography.Text>
      </Col>
      <Col xs={24}>
        <Typography.Text>Full address: </Typography.Text>
        <Typography.Text code>{user.name}@cc.salimon.io</Typography.Text>
      </Col>
      <Col xs={24}>
        <Typography.Text>Secret token: </Typography.Text>
        <Typography.Text code>{user.secretToken}</Typography.Text>
      </Col>
      <Col xs={24} style={{ textAlign: "right" }}>
        <Button type="primary" onClick={next}>
          I copied my secret token somewhere safe
        </Button>
      </Col>
    </>
  );
}
function Step2() {
  const { user } = useContext(AuthContext);
  if (!user) return null;
  return (
    <>
      <Col xs={24}>
        <Typography.Text>
          Welcome to the salimon credit center. from now on, you are an official
          member of salimon network. have fun!
        </Typography.Text>
      </Col>
      <Col xs={24}>
        <Typography.Text type="secondary">
          Welcome to the salimon credit center. from now on, you are an official
          member of salimon network. have fun!
        </Typography.Text>
      </Col>
    </>
  );
}

export default function Register() {
  const [step, setStep] = useState(0);
  return (
    <Card title="Register">
      <Row gutter={[12, 12]}>
        <Col xs={24}>
          <Steps
            size="small"
            current={step}
            items={[
              { title: "pick a name" },
              { title: "get secret token" },
              { title: "done" },
            ]}
          />
        </Col>
        {step === 0 && (
          <Step0
            next={() => {
              setStep(step + 1);
            }}
          />
        )}
        {step === 1 && (
          <Step1
            next={() => {
              setStep(step + 1);
            }}
          />
        )}
        {step === 2 && <Step2 />}
      </Row>
    </Card>
  );
}
