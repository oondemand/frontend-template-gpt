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
      // color="gray.700"
      alignItems="center"
      // border="1px solid"
      // borderColor="gray.200"
      rounded="md"
      justifyContent="space-between"
      // _hover={{ bg: "gray.200" }}
      // bg="gray.50"
      w="full"
      p="2"
      px="4"
    >
      <Text fontSize="sm">{getTenant().nome}</Text>
      <ArrowLeftRight />
    </Button>
  );
}
