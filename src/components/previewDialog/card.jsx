import { Flex, IconButton, Text, Button, Box } from "@chakra-ui/react";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import Markdown from "react-markdown";
import { Copy, Clipboard } from "lucide-react";

import { Prose } from "../../components/ui/prose";

import { useClipboard } from "../../hooks/useClipboard";
import { useState } from "react";

import { JsonView, allExpanded } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const customTheme = {};

export function TextCard({ text, type, details }) {
  const { copyToClipboard, copied } = useClipboard();
  const [open, setOpen] = useState();

  return (
    <>
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
        <Flex gap="4">
          <Text fontWeight="semibold" color="gray.500">
            {type === "user" ? "Usuário" : "Resposta"}
          </Text>
          {type === "bot" && details && (
            <Button
              rounded="full"
              size="2xs"
              onClick={() => setOpen(true)}
              variant="outline"
              colorPalette="black"
            >
              Inspecionar detalhes
            </Button>
          )}
        </Flex>
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

      {open && (
        <DialogRoot
          lazyMount
          placement="center"
          size="cover"
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
        >
          <DialogContent maxH="90%">
            <DialogHeader>
              <DialogTitle>Detalhes da requisição</DialogTitle>
            </DialogHeader>
            <DialogBody w="full" h="full" overflow="auto" scrollbarWidth="thin">
              <JsonView
                container={{ backgroundColor: "red" }}
                data={{
                  prompt: details?.prompt,
                  variaveis: details?.body,
                  resposta: details?.response,
                }}
                shouldExpandNode={allExpanded}
                style={customTheme}
              />
            </DialogBody>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogRoot>
      )}
    </>
  );
}
