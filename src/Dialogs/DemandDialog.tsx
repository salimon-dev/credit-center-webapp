import { Modal } from "antd";

interface IProps {
  open: boolean;
  onClose: () => void;
}
export default function DemandDialog({ onClose, open }: IProps) {
  return (
    <Modal open={open} onCancel={onClose}>
      demand dialog
    </Modal>
  );
}
