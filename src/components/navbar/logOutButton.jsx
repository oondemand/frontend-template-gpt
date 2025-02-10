import { Button, Text } from "@chakra-ui/react";

import { LogOut } from "lucide-react";
import { useConfirmation } from "../../hooks/confirmationModal";
import { useAuth } from "../../hooks/auth";

export function LogOutButton() {
  const { requestConfirmation } = useConfirmation();
  const { signOut } = useAuth();

  const handleLogOut = async () => {
    const response = await requestConfirmation({
      title: "Tem certeza que deseja sair?",
      description: "Você terá que fazer o login novamente!",
    });

    if (response.action === "confirmed") {
      signOut();
    }
  };

  return (
    <Button
      onClick={handleLogOut}
      display="flex"
      color="gray.900"
      alignItems="center"
      rounded="md"
      justifyContent="space-between"
      _hover={{ bg: "gray.300" }}
      w="full"
      bg="gray.200"
      p="2"
      px="4"
    >
      <Text fontSize="md">Sair</Text>
      <LogOut />
    </Button>
  );
}
