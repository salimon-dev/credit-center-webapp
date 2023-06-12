import { Button, Col, Modal, Row } from "antd";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

interface IProps {
  open: boolean;
  onClose: () => void;
}
export default function ProfileDialog({ open, onClose }: IProps) {
  const { user, setUser } = useContext(AuthContext);
  if (!user) return null;
  return (
    <Modal open={open} onCancel={onClose} footer={null}>
      <Row gutter={[12, 12]}>
        <Col xs={24}>Public name: {user.name}</Col>
        <Col xs={24}>Secret Token: {user.secretToken}</Col>
        <Col xs={24}>Balance: {user.balance}</Col>
        <Col xs={24}>Score: {user.score}</Col>
        <Col xs={24} style={{ textAlign: "right" }}>
          <Button
            onClick={() => {
              setUser(undefined);
              onClose();
            }}
          >
            Logout
          </Button>
        </Col>
      </Row>
    </Modal>
  );
}
