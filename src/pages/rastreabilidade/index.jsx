import { Box, Heading, Tabs } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Tab1 } from "./tabs/tab1";

export function Rastreabilidade() {
  // const { data: settings } = useQuery({
  //   queryKey: ["list-settings"],
  //   queryFn: SettingService.listSettings,
  // });

  // const { data: baseOmies } = useQuery({
  //   queryKey: ["list-base-omies"],
  //   queryFn: BaseOmieService.listBaseOmies,
  // });

  return (
    <Box>
      <Heading fontSize="md" color="gray.500" fontWeight="normal">
        Rastreabilidade
      </Heading>
      <Tabs.Root mt="2" lazyMount unmountOnExit defaultValue="tab-1">
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
        <Tabs.Content value="tab-2">Conteúdo da aba 2</Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
