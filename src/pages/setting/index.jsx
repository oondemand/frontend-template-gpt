import { Box, Heading, Tabs } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { SettingService } from "../../services/settings";
import { Tab1 } from "./tabs/tab1";
import { Tab2 } from "./tabs/tab2";
import { BaseOmieService } from "../../services/baseOmie";

export function Settings() {
  const { data: settings } = useQuery({
    queryKey: ["list-settings"],
    queryFn: SettingService.listSettings,
  });

  const { data: baseOmies } = useQuery({
    queryKey: ["list-base-omies"],
    queryFn: BaseOmieService.listBaseOmies,
  });

  return (
    <Box>
      <Heading fontSize="md" color="gray.500" fontWeight="normal">
        Configurações
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
            Sistema
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
            Base Omie
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab-1">
          {settings && <Tab1 settings={settings} />}
        </Tabs.Content>
        <Tabs.Content value="tab-2">
          {settings && baseOmies && (
            <Tab2 settings={settings} defaultBaseOmie={baseOmies?.[0]?._id} />
          )}
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
