import React, { createContext, useContext, useState } from "react";
import { PreviewDialog } from "../components/previewDialog";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [previewDialog, setPreviewDialog] = useState({
    visible: false,
    content: {},
  });

  const openDialog = (params) => {
    console.log(params);

    setPreviewDialog({ visible: true, content: params });
  };

  const closeDialog = () => {
    setPreviewDialog({ visible: false, content: {} });
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      <PreviewDialog
        templateId={previewDialog.content._id}
        isOpen={previewDialog.visible}
        templateEjs={previewDialog.content.templateEjs}
        omieVar={previewDialog.content.omieVar}
        onClose={closeDialog}
      />
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};
