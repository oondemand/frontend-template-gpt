import { Flex, IconButton, Text } from "@chakra-ui/react";

import Markdown from "react-markdown";
import { Copy, Clipboard } from "lucide-react";

import { Prose } from "../../components/ui/prose";

import { useClipboard } from "../../hooks/useClipboard";

export function TextCard({ text, type }) {
  const { copyToClipboard, copied } = useClipboard();

  return (
    <Flex
      rounded="md"
      px="2"
      gap="0"
      border="1px dashed"
      borderColor="gray.200"
      position="relative"
      flexDir="column"
      pt="1"
    >
      <Text fontWeight="semibold" color="gray.500">
        {type === "user" ? "Usuário" : "Resposta"}
      </Text>
      <Prose fontSize="sm" lineHeight="1.5">
        <Markdown>{text}</Markdown>
      </Prose>
      <IconButton
        bg="transparent"
        position="absolute"
        right="1"
        top="1"
        color="gray.500"
        size="sm"
        rounded="full"
        _hover={{ backgroundColor: "gray.100" }}
        onClick={() => {
          copyToClipboard(text);
        }}
      >
        {copied && <Clipboard />}
        {!copied && <Copy />}
      </IconButton>
    </Flex>
  );
}
