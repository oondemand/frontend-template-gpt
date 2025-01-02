import { HStack, Flex } from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "../../../components/input/textInput";

const schema = z.object({
  nome: z.string().nonempty("Nome obrigatório!"),
});

export function TenantForm({ onSubmit, formId, data }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { ...data },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap="2">
        <HStack>
          <TextInput
            label="Nome *"
            {...register("nome")}
            error={errors.nome?.message}
          />
        </HStack>
      </Flex>
    </form>
  );
}
