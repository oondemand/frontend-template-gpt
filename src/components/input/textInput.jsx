import { forwardRef } from "react";
import { Box, Text, Input } from "@chakra-ui/react";

export const TextInput = forwardRef(
  ({ w = "sm", error, label, ...rest }, ref) => {
    return (
      <Box>
        <Text color="orange.600">{label}</Text>
        <Input {...rest} ref={ref} w={w} type="text" />
        {error && (
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
        )}
      </Box>
    );
  }
);
