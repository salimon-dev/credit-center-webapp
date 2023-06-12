import { ReactNode, createContext, useState } from "react";

interface ITransferParam {
  address?: string;
  amount?: string;
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
  return (
    <DialogContext.Provider
      value={{
        openDeclineDialog: (id: string) => {
          setOpenDeclineDialog(true);
        },
        openExecuteDialog: (id: string) => {
          setOpenExecuteDialog(true);
        },
        openDemandDialog: (params?: ITransferParam) => {
          setOpenDemandDialog(true);
        },
        openSendDialog: (params?: ITransferParam) => {
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
