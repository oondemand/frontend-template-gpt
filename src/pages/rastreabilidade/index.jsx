import { Box, Heading, Tabs } from "@chakra-ui/react";
import { Tab1 } from "./tabs/tab1";
import { Tab2 } from "./tabs/tab2";
import { useStateWithStorage } from "../../hooks/useStateStorage";

export function Rastreabilidade() {
  const [tab, setTab] = useStateWithStorage("RASTREABILIDADE_TAB", "tab-1");

  return (
    <Box>
      <Heading fontSize="md" color="gray.500" fontWeight="normal">
        Rastreabilidade
      </Heading>
      <Tabs.Root
        mt="2"
        lazyMount
        unmountOnExit
        value={tab}
        onValueChange={(e) => setTab(e.value)}
      >
        <Tabs.List>
          <Tabs.Trigger
            fontSize="md"
            value="tab-1"
            colorPalette="orange"
            px="6"
            css={{
              "&[data-selected]": {
                color: "orange.500",
              },
            }}
          >
            Logs
          </Tabs.Trigger>
          <Tabs.Trigger
            colorPalette="orange"
            fontSize="md"
            value="tab-2"
            px="6"
            css={{
              "&[data-selected]": {
                color: "orange.500",
              },
            }}
          >
            Webhooks
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab-1">
          <Tab1 />
        </Tabs.Content>
        <Tabs.Content value="tab-2">
          <Tab2 />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
