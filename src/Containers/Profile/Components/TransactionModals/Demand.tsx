import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import { fecthUser } from "../../../../Rest/users";
import { useState } from "react";
import { demandBalance, getFee } from "../../../../Rest/transactions";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { source } from "../../../../configs/base";

interface IPreviewProps {
  name: string;
  amount: number;
  fee: number;
  score: number;
}
function PreviewResult({ name, amount, fee, score }: IPreviewProps) {
  return (
    <>
      <Col xs={24}>
        <Typography.Text>
          Receipt: {name}
          {source()} (score: {score} SP)
        </Typography.Text>
      </Col>
      <Col xs={24}>
        <Typography.Text>
          Amount you get: {amount} BP (sender will pay {fee} BP as fee)
        </Typography.Text>
      </Col>
      <Col xs={24}>
        <Typography.Text>
          Total amount spending on this transaction by sender: {amount + fee} BP
        </Typography.Text>
      </Col>
    </>
  );
}

interface IProps {
  open: boolean;
  onClose: () => void;
}

export default function Demand({ open, onClose }: IProps) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [preview, setPreview] = useState<{
    name: string;
    amount: number;
    fee: number;
    score: number;
  }>();
  const [runningPreview, setRunningPreview] = useState(false);
  async function runPreview() {
    try {
      setRunningPreview(true);
      const { name, amount } = await form.validateFields();
      const userResult = await fecthUser(name);
      const feeResult = await getFee(amount);
      setPreview({
        name,
        amount,
        fee: feeResult.fee,
        score: userResult.score,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setRunningPreview(false);
    }
  }

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();
  async function submit() {
    try {
      setError(undefined);
      setSubmitting(true);
      const { name, amount } = await form.validateFields();
      await demandBalance({ name, amount });
      queryClient.refetchQueries(["transactions"]);
      onClose();
    } catch (e) {
      console.log(e);
      const error = e as AxiosError;
      if (error.response) {
        if (error.response.status === 400) {
          setError((error.response.data as { message: string }).message);
        }
      }
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Modal open={open} onCancel={onClose} title="Demand credit" footer={null}>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ name: searchParams.get("name") }}
      >
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Form.Item
              name="name"
              label="name"
              rules={[{ required: true, message: "please enter the name" }]}
            >
              <Input addonAfter={source()} />
            </Form.Item>
          </Col>
          <Col xs={24}>
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
              <InputNumber style={{ width: "100%" }} addonAfter="BP" />
            </Form.Item>
          </Col>
          <Col xs={24} style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                type="primary"
                disabled={!preview}
                onClick={submit}
                loading={submitting}
              >
                Submit
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
    </Modal>
  );
}
