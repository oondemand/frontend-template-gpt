import { Switch } from "../../../components/ui/switch";
import { Flex } from "@chakra-ui/react";

export const SwitchCell = () => {
  return (
    <Flex flex="1" alignItems="center" justifyContent="center">
      <Switch colorPalette="orange" size="sm" />
    </Flex>
  );
};
