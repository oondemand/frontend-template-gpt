import React, { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <DialogContext.Provider
      value={{ isDialogOpen, openDialog, closeDialog, setIsDialogOpen }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};
