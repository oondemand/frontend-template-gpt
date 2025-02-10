import { Flex } from "@chakra-ui/react";

export function NavbarFooter({ children }) {
  return (
    <Flex w="full" flexDir="column" position="absolute" gap="2" bottom="2">
      {children}
    </Flex>
  );
}
