import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes";

import { AuthProvider } from "./hooks/auth";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <AuthProvider>
        <Toaster richColors position="top-right" />
        <ChakraProvider value={defaultSystem}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}

export default App;
