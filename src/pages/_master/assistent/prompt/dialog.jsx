import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";

import { Button, Flex, Input, Text } from "@chakra-ui/react";

import { JsonView, allExpanded } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

import data from "../../../../_constants/example.json";

const customTheme = {};

export function VariablesDialog() {
  return (
    <DialogRoot placement="center">
      <DialogTrigger asChild>
        <Text colorPalette="cyan" ml="2" textDecoration="underline">
          Visualizar variáveis
        </Text>
      </DialogTrigger>
      <DialogContent maxH="90%">
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Convidar usuário</DialogTitle>
        </DialogHeader>
        <DialogBody h="full" overflowY="auto">
          <JsonView
            container={{ backgroundColor: "red" }}
            data={data}
            shouldExpandNode={allExpanded}
            style={customTheme}
          />
        </DialogBody>
        <DialogFooter />
      </DialogContent>
    </DialogRoot>
  );
}
