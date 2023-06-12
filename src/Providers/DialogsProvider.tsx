import { ReactNode, createContext, useState } from "react";

interface ITransferParam {
  address?: string;
  amount?: number;
}

export interface IDialogsContext {
  openSendDialog: (params?: ITransferParam) => void;
  openDemandDialog: (params?: ITransferParam) => void;
  closeSendDialog: () => void;
  closeDemandDialog: () => void;

  openExecuteDialog: (id: string) => void;
  openDeclineDialog: (id: string) => void;
  closeExecuteDialog: () => void;
  closeDeclineDialog: () => void;
}

export const DialogContext = createContext<IDialogsContext>({
  openDeclineDialog: () => {
    return;
  },
  openDemandDialog: () => {
    return;
  },
  openExecuteDialog: () => {
    return;
  },
  openSendDialog: () => {
    return;
  },
  closeDeclineDialog: () => {
    return;
  },
  closeDemandDialog: () => {
    return;
  },
  closeExecuteDialog: () => {
    return;
  },
  closeSendDialog: () => {
    return;
  },
});

interface IProps {
  children: ReactNode;
}

export function DialogsContextProvider({ children }: IProps) {
  const [openSendDialog, setOpenSendDialog] = useState(false);
  const [openDemandDialog, setOpenDemandDialog] = useState(false);
  const [openExecuteDialog, setOpenExecuteDialog] = useState(false);
  const [openDeclineDialog, setOpenDeclineDialog] = useState(false);
  const [address, setAddress] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [transactionId, setTransactionId] = useState<string>();
  return (
    <DialogContext.Provider
      value={{
        openDeclineDialog: (id: string) => {
          setTransactionId(id);
          setOpenDeclineDialog(true);
        },
        openExecuteDialog: (id: string) => {
          setTransactionId(id);
          setOpenExecuteDialog(true);
        },
        openDemandDialog: (params?: ITransferParam) => {
          if (params) {
            if (params.address) {
              setAddress(params.address);
            }
            if (params.amount) {
              setAmount(params.amount);
            }
          }
          setOpenDemandDialog(true);
        },
        openSendDialog: (params?: ITransferParam) => {
          if (params) {
            if (params.address) {
              setAddress(params.address);
            }
            if (params.amount) {
              setAmount(params.amount);
            }
          }
          setOpenSendDialog(true);
        },
        closeDeclineDialog: () => {
          setOpenDeclineDialog(false);
        },
        closeDemandDialog: () => {
          setOpenDemandDialog(false);
        },
        closeExecuteDialog: () => {
          setOpenExecuteDialog(false);
        },
        closeSendDialog: () => {
          setOpenSendDialog(false);
        },
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
