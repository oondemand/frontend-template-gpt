import React, { createContext, useContext, useState } from "react";
import { PromptDialog } from "../components/promptDialog";

const DialogContext = createContext();

export const PromptDialogProvider = ({ children }) => {
  const [promptDialog, setPromptDialog] = useState({
    visible: false,
    type: "create",
    data: {},
  });

  const openPromptDialog = ({ data, type }) => {
    setPromptDialog({ visible: true, data, type: type });
  };

  const closePromptDialog = () => {
    setPromptDialog({ visible: false, data: {}, type: "create" });
  };

  return (
    <DialogContext.Provider value={{ openPromptDialog, closePromptDialog }}>
      <PromptDialog
        isVisible={promptDialog.visible}
        data={promptDialog.data}
        type={promptDialog.type}
        onClose={closePromptDialog}
      />
      {children}
    </DialogContext.Provider>
  );
};

export const usePromptDialog = () => {
  return useContext(DialogContext);
};
