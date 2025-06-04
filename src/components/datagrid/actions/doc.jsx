import {
  Popover,
  Button,
  Portal,
  Text,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { Check, Dock } from "lucide-react";
import { useClipboard } from "../../../hooks/useClipboard";
import { env } from "../../../config/env";
import { Copy, Clipboard } from "lucide-react";
import { PATH_BY_KANBAN_MAP } from "../../../_constants/maps";

export const DocAction = ({ row }) => {
  const { copyToClipboard, copied } = useClipboard();

  const generateUrl = () => {
    return `${env.VITE_API_URL}/webhooks/${
      PATH_BY_KANBAN_MAP[row?.original?.kanbanOmie]
    }/${row?.original?._id}`;
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <IconButton colorPalette="gray" variant="surface" size="2xs" ml="2">
          <Dock />
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <Popover.Title fontWeight="semibold">
                URL de integração
              </Popover.Title>
              <Text
                my="4"
                p="2"
                border="1px dashed"
                rounded="md"
                borderColor="gray.200"
                bg="gray.50/40"
              >
                {generateUrl()}
              </Text>
              <Button
                size="xs"
                variant="subtle"
                onClick={() => copyToClipboard(generateUrl())}
              >
                {copied && <Check />}
                {!copied && <Copy />}
                Copiar
              </Button>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
