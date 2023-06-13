export interface IUser {
  _id: string;
  name: string;
  score: number;
  balance: number;
  registeredAt: number;
  secretToken: string;
  secretDate: number;
}

export interface ITransaction {
  _id: string;
  from: { _id: string; name: string };
  to: { _id: string; name: string };
  amount: number;
  fee: number;
  status: string;
  createdAt: number;
  executedAt?: number;
}

export interface ICollection<T> {
  ok: boolean;
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
  };
}
