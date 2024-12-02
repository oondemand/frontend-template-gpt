import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes";

import { AuthProvider } from "./hooks/auth";
import { ConfirmationProvider } from "./hooks/confirmationModal";

import { Toaster } from "sonner";

function App() {
  return (
    <>
      <AuthProvider>
        <Toaster richColors position="top-right" />
        <ChakraProvider value={defaultSystem}>
          <ConfirmationProvider>
            <RouterProvider router={router} />
          </ConfirmationProvider>
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}

export default App;
