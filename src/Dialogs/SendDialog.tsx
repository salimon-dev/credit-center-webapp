import { Modal } from "antd";

interface IProps {
  open: boolean;
  onClose: () => void;
}
export default function SendDialog({ onClose, open }: IProps) {
  return (
    <Modal open={open} onCancel={onClose}>
      send dialog
    </Modal>
  );
}
