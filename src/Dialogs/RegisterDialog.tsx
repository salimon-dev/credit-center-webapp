import { Modal } from "antd";

interface IProps {
  open: boolean;
  onClose: () => void;
}
export default function RegisterDialog({ onClose, open }: IProps) {
  return (
    <Modal open={open} onCancel={onClose}>
      register dialog
    </Modal>
  );
}
