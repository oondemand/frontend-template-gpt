import { Box } from "@chakra-ui/react";

export function DashedBox({ children, ...props }) {
  return (
    <Box
      px="4"
      pt="4"
      pb="6"
      rounded="md"
      border="1px dashed"
      borderColor="gray.200"
      {...props}
    >
      {children}
    </Box>
  );
}
