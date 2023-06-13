import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import { fecthUser } from "../../Rest/users";
import { useAxios } from "../../Providers/AuthProvider";
import { useState } from "react";
import { getFee, sendBalance } from "../../Rest/transactions";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";

interface IPreviewProps {
  id: string;
  name: string;
  amount: number;
  fee: number;
}
function PreviewResult({ id, name, amount, fee }: IPreviewProps) {
  return (
    <>
      <Col xs={24}>
        <Typography.Text>
          Receipt: {name}, address: {id}
        </Typography.Text>
      </Col>
      <Col xs={24}>
        <Typography.Text>
          Amount receipt recieves: {amount} (you pay {fee} in addition as fee)
        </Typography.Text>
      </Col>
      <Col xs={24}>
        <Typography.Text>
          Total amount spent on this transaction: {amount + fee}
        </Typography.Text>
      </Col>
    </>
  );
}

export default function Send() {
  const [searchParams] = useSearchParams();
  const [messageApi, messageContext] = message.useMessage();
  const axios = useAxios();
  const [form] = Form.useForm();
  const [preview, setPreview] = useState<{
    id: string;
    name: string;
    amount: number;
    fee: number;
  }>();
  const [runningPreview, setRunningPreview] = useState(false);
  async function runPreview() {
    try {
      setRunningPreview(true);
      const { id, amount } = await form.validateFields();
      const userResult = await fecthUser(id, axios);
      const feeResult = await getFee(amount, axios);
      setPreview({ id, name: userResult.name, amount, fee: feeResult.fee });
    } catch (e) {
      console.log(e);
    } finally {
      setRunningPreview(false);
    }
  }

  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string>();
  async function send() {
    try {
      setError(undefined);
      setSending(true);
      const { id, amount } = await form.validateFields();
      await sendBalance({ to: id, amount }, axios);
      messageApi.open({ type: "success", content: "transaction sent!" });
    } catch (e) {
      console.log(e);
      const error = e as AxiosError;
      if (error.response) {
        if (error.response.status === 400) {
          setError((error.response.data as { message: string }).message);
        }
      }
    } finally {
      setSending(false);
    }
  }
  return (
    <Row gutter={[0, 12]} style={{ justifyContent: "center" }}>
      {messageContext}
      <Col xs={24} md={20} lg={18} xl={16}>
        <Card title="Send balance">
          <Form
            layout="vertical"
            form={form}
            initialValues={{ id: searchParams.get("address") }}
          >
            <Row gutter={[12, 12]}>
              <Col xs={12}>
                <Form.Item
                  name="id"
                  label="Address"
                  rules={[
                    { required: true, message: "please enter the address" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  name="amount"
                  label="Amount"
                  rules={[
                    {
                      required: true,
                      min: 100,
                      type: "number",
                      message: "transaction minumum is 100",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24} style={{ textAlign: "right" }}>
                <Space>
                  <Button
                    type="primary"
                    disabled={!preview}
                    onClick={send}
                    loading={sending}
                  >
                    Send
                  </Button>
                  <Button onClick={runPreview} loading={runningPreview}>
                    Preview
                  </Button>
                </Space>
              </Col>
              {preview && <PreviewResult {...preview} />}
              {error && (
                <Col xs={24}>
                  <Alert type="error" message={error} />
                </Col>
              )}
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
