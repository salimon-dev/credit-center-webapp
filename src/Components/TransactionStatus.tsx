import { Tag } from "antd";

interface IStatuTagProps {
  children: string;
}
export default function TransactionStatus({ children }: IStatuTagProps) {
  switch (children) {
    case "pending":
      return (
        <Tag style={{ minWidth: 75, textAlign: "center" }} color="yellow">
          Pending
        </Tag>
      );
    case "executed":
      return (
        <Tag style={{ minWidth: 75, textAlign: "center" }} color="green">
          Executed
        </Tag>
      );
    case "declined":
      return (
        <Tag style={{ minWidth: 75, textAlign: "center" }} color="red">
          Declined
        </Tag>
      );
  }
  return (
    <Tag style={{ minWidth: 75, textAlign: "center" }}>
      {children.toUpperCase()}
    </Tag>
  );
}
