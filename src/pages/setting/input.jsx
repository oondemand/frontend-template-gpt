import { Box, Text, Input } from "@chakra-ui/react";

export const FlushedInput = ({ name, label, ...rest }) => {
  return (
    <Box>
      {(name || label) && (
        <Text fontSize="xs" color="gray.600">
          {label ? label : name}
        </Text>
      )}
      <Input
        name={name}
        variant="flushed"
        fontSize="sm"
        color="gray.600"
        size="xs"
        w="md"
        {...rest}
      />
    </Box>
  );
};
