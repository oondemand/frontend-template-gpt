import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";

import { TextInput } from "../../components/input/textInput";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { z } from "zod";

import { toast } from "sonner";

import { UserService } from "../../services/users";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Email inválido"),
});

export function InviteUserModal() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: inviteUserMutation } = useMutation({
    mutationFn: UserService.inviteUser,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [["list-users"]],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await inviteUserMutation({
        body: { ...data },
      });

      if (response.status === 201) {
        toast.success("Um convite foi enviado para o email do usuário.");
      }
      setOpen(false);
      return reset();
    } catch (error) {
      toast.error("Ouve um erro ao convidar usuário!");
    }
  };

  return (
    <DialogRoot
      open={open}
      onOpenChange={(e) => {
        setOpen(e.open);
        reset();
      }}
      placement="center"
    >
      <DialogTrigger asChild>
        <Button colorPalette="cyan">Convidar usuário</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Convidar usuário</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text fontSize="md" color="orange.600">
              Email *
            </Text>
            <Flex alignItems="end" justifyContent="center" gap="2">
              <Input placeholder="ex: email@gmail.com" {...register("email")} />
              <Button type="submit" colorPalette="gray" variant="surface">
                Convidar
              </Button>
            </Flex>
            {errors.email?.message && (
              <Text color="red.500" fontSize="sm">
                {errors.email?.message}
              </Text>
            )}
          </form>
        </DialogBody>
        <DialogFooter />
      </DialogContent>
    </DialogRoot>
  );
}
