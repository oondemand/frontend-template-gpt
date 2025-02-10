import { Button, Text } from "@chakra-ui/react";

import { ArrowLeftRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTenant } from "../../hooks/tenant";
import { queryClient } from "../../config/react-query";

export function ChangeTenantButton() {
  const navigate = useNavigate();
  const { getTenant } = useTenant();

  const handleChangeTenant = () => {
    navigate("/multi-tenant", { viewTransition: true });
    queryClient.clear();
  };

  return (
    <Button
      onClick={handleChangeTenant}
      display="flex"
      colorPalette="orange"
      variant="surface"
      alignItems="center"
      rounded="md"
      justifyContent="space-between"
      w="full"
      p="2"
      px="4"
    >
      <Text truncate fontSize="sm">
        {getTenant().nome}
      </Text>
      <ArrowLeftRight />
    </Button>
  );
}
