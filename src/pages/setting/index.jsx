import {
  Box,
  Flex,
  Heading,
  Input,
  Tabs,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";
import { SettingService } from "../../services/settings";
import { toast } from "sonner";
import { FlushedInput } from "./input";
import { SelectTemplate } from "../../components/selectTemplate";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Tab1 } from "./tabs/tab1";
import { Tab2 } from "./tabs/tab2";

export function Settings() {
  const {
    data: settings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["list-settings"],
    queryFn: SettingService.listSettings,
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
          {settings && <Tab2 settings={settings} />}
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
