export interface IReference {
  _id: string;
  name: string;
}
export interface IUser {
  _id: string;
  name: string;
  score: number;
  balance: number;
  registeredAt: number;
  secretToken: string;
  secretDate: number;
  otp: string;
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

export interface ISession {
  _id: string;
  hostUser: IReference;
  targetUser: IReference;
  token: string;
  status: string;
  description: string;
  createdAt: number;
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
