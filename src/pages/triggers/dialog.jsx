import {
  DialogActionTrigger,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import { Flex, Box } from "@chakra-ui/react";
import { FlushedInput } from "../setting/input";
import { SelectTemplate } from "../../components/selectTemplate";
import { SelectBaseOmie } from "../../components/selectBaseOmie";
import { SelectEtapa } from "../../components/selectEtapa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const schema = z.object({
  "kanban-omie": z.string(),
  "base-omie": z.string(),
  "etapa-geracao": z.string(),
  "etapa-processado": z.string(),
  "etapa-erro": z.string(),
  "enviar-email": z.boolean(),
  "template-assunto-email": z.string(),
  "template-corpo-email": z.string(),
  "template-documento": z.string(),
  adiantamento: z.boolean(),
  categoria: z.string(),
});

export const CreateConfigForm = ({ defaultValues, trigger }) => {
  console.log("[defaultValues]:", defaultValues);

  const form = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  // const [formValues, setFormValues] = useState(defaultValues);

  // useEffect(() => {
  //   setFormValues(defaultValues);
  // }, [defaultValues]); 
  return (
    <DialogRoot lazyMount placement="center" size="cover">
      <DialogTrigger cursor="pointer">{trigger}</DialogTrigger>
      <DialogContent maxW="90%">
        <DialogHeader>
          <DialogTitle>Gatilho</DialogTitle>
        </DialogHeader>
        <DialogBody w="full" h="full" overflow="auto" scrollbarWidth="thin">
          <Flex wrap="wrap" gap="4" mt="4" alignItems="end">
            <SelectBaseOmie
              w="md"
              size="md"
              variant=""
              borderBottom="1px solid"
              borderBottomColor="gray.200"
              label="Base omie"
              placeholder="Base omie"
              multiple
            />

            <SelectEtapa
              w="md"
              size="md"
              variant=""
              borderBottom="1px solid"
              borderBottomColor="gray.200"
              label="Etapa geração"
              placeholder="Etapa geração"
            />

            <SelectEtapa
              w="md"
              size="md"
              variant=""
              borderBottom="1px solid"
              borderBottomColor="gray.200"
              label="Etapa processando"
              placeholder="Etapa processando"
            />

            <SelectEtapa
              w="md"
              size="md"
              variant=""
              borderBottom="1px solid"
              borderBottomColor="gray.200"
              label="Etapa erro"
              placeholder="Etapa erro"
            />

            <FlushedInput label="Enviar email" />

            <SelectTemplate
              w="md"
              size="md"
              variant=""
              borderBottom="1px solid"
              borderBottomColor="gray.200"
              label="Template Assunto e-mail"
              placeholder="Template Assunto e-mail"
              onChange={(e) => console.log(e.target.value)}
            />

            <SelectTemplate
              w="md"
              size="md"
              variant=""
              borderBottom="1px solid"
              borderBottomColor="gray.200"
              label="Template e-mail corpo"
              placeholder="Template e-mail corpo"
            />

            <SelectTemplate
              w="md"
              size="md"
              variant=""
              borderBottom="1px solid"
              borderBottomColor="gray.200"
              label="Template documento"
              placeholder="Template documento"
            />

            <FlushedInput label="Adiantamento" />
            <FlushedInput label="Categoria" />
          </Flex>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
