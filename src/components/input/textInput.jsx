import { Box, Text, Input } from "@chakra-ui/react";

export function TextInput({
  w = "sm",
  name,
  onChange,
  value,
  error,
  label,
  ...rest
}) {
  return (
    <Box>
      <Text color="orange.600">{label}</Text>
      <Input
        {...rest}
        w={w}
        type="text"
        name={name}
        onChange={onChange}
        value={value}
      />
      {error && (
        <Text color="red.500" fontSize="sm">
          {error}
        </Text>
      )}
    </Box>
  );
}
