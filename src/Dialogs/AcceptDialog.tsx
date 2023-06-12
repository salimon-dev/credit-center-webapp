import { Modal } from "antd";
import { ITransaction } from "../structs";

interface IProps {
  open: boolean;
  id: string;
  onClose: () => void;
}
export default function AcceptDialog({ onClose, open }: IProps) {
  return (
    <Modal open={open} onCancel={onClose}>
      {/* accept dialog {transaction.from._id} */}
    </Modal>
  );
}
