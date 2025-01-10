import { SelectBaseOmie } from "../../components/selectBaseOmie";
import { Button, Flex, Spinner } from "@chakra-ui/react";
import { TextInput } from "../../components/input/textInput";
import { useState } from "react";

export function ImportOmieVariables({ onImportOmieVariables, isLoading }) {
  const [field, setField] = useState({
    baseOmie: "",
    os: "",
  });

  const [error, setError] = useState({
    baseOmie: null,
    os: null,
  });

  const onImport = ({ baseOmie, os }) => {
    if (field.baseOmie === "") {
      setError((prev) => ({ ...prev, baseOmie: "Selecione base omie" }));
    }

    if (field.os.trim() === "") {
      setError((prev) => ({ ...prev, os: "Preencha os" }));
    }

    if (field.baseOmie !== "" && field.os !== "") {
      return onImportOmieVariables({ baseOmie, os });
    }
  };

  return (
    <Flex gap="2">
      <SelectBaseOmie
        value={field.baseOmie}
        onValueChange={({ value }) => {
          setField((prev) => ({ ...prev, baseOmie: value }));
          setError((prev) => ({ ...prev, baseOmie: null }));
        }}
        w="xs"
        size="xs"
        border={error.baseOmie ? "1px solid red" : ""}
      />

      <TextInput
        value={field.os}
        onChange={(e) => {
          setField((prev) => ({ ...prev, os: e.target.value }));
          setError((prev) => ({ ...prev, os: null }));
        }}
        size="xs"
        w="32"
        placeholder="Ordem de serviço"
        borderColor={error.os ? "red.500" : ""}
        outlineColor={error.os ? "red.500" : ""}
      />
      <Button w="40" onClick={() => onImport(field)} variant="subtle" size="xs">
        {!isLoading && "Importar variáveis Omie"}
        {isLoading && <Spinner />}
      </Button>
    </Flex>
  );
}
