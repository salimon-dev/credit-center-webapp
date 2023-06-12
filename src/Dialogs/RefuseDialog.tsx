import { Modal } from "antd";
import { ITransaction } from "../structs";

interface IProps {
  open: boolean;
  transaction: ITransaction;
  onClose: () => void;
}
export default function RefuseDialog({ transaction, onClose, open }: IProps) {
  return (
    <Modal open={open} onCancel={onClose}>
      refuse dialog {transaction.from._id}
    </Modal>
  );
}
