import { forwardRef } from "react";
import { Box, Text, Input } from "@chakra-ui/react";

export const TextInput = forwardRef(
  (
    { w = "sm", error, label, color = "orange.600", fontSize = "sm", ...rest },
    ref
  ) => {
    return (
      <Box w="full">
        <Text mb="1.5" color={color} fontSize={fontSize}>
          {label}
        </Text>
        <Input {...rest} ref={ref} w={w} />
        {error && (
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
        )}
      </Box>
    );
  }
);
