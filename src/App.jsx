import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes";

import { AuthProvider } from "./hooks/auth";
import { ConfirmationProvider } from "./hooks/confirmationModal";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { PreviewDialogProvider } from "./hooks/previewModalContext";

import { env } from "./config/env";

import { queryClient } from "./config/react-query";

import { Toaster } from "sonner";
import { PromptDialogProvider } from "./hooks/promptContext";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {env.MODE === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
        <AuthProvider>
          <Toaster richColors position="bottom-right" />
          <ChakraProvider value={defaultSystem}>
            <ConfirmationProvider>
              <PreviewDialogProvider>
                <PromptDialogProvider>
                  <RouterProvider router={router} />
                </PromptDialogProvider>
              </PreviewDialogProvider>
            </ConfirmationProvider>
          </ChakraProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
