import { Flex, Table, IconButton, Text, Button } from "@chakra-ui/react";
import { FilePenLine, Trash2, CopyPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectBaseOmie } from "../../components/selectBaseOmie";
import { useAuth } from "../../hooks/auth";

export function SettingsTable({ data, onDelete }) {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(data);
  const { user } = useAuth();

  const handleSearch = ({ value }) => {
    const results = data.filter((e) => {
      return e?.baseOmie?._id === value[0];
    });

    setSettings(results);
  };

  useEffect(() => {
    setSettings(data);
  }, [data]);

  return (
    <Table.Root variant="line" striped>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>
            <Flex alignItems="center" gap="4">
              <Text>Base omie </Text>
              <SelectBaseOmie
                onValueChange={handleSearch}
                w="80"
                variant="subtle"
                size="xs"
              />
              <Button
                onClick={() => setSettings(data)}
                variant="surface"
                size="xs"
              >
                Limpar filtros
              </Button>
            </Flex>
          </Table.ColumnHeader>
          <Table.ColumnHeader>Nome</Table.ColumnHeader>
          <Table.ColumnHeader>Codigo</Table.ColumnHeader>
          <Table.ColumnHeader>Valor</Table.ColumnHeader>
          <Table.ColumnHeader />
        </Table.Row>
      </Table.Header>
      <Table.Body maxH="720px" overflow="auto">
        {settings.map(
          (setting) =>
            ((user.tipo === "padrao" && setting.baseOmie?.nome) ||
              user.tipo !== "padrao") && (
              <Table.Row key={setting._id}>
                <Table.Cell>
                  {setting.baseOmie?.nome || "Configuração geral"}
                </Table.Cell>
                <Table.Cell>{setting.nome}</Table.Cell>
                <Table.Cell>{setting.codigo}</Table.Cell>
                <Table.Cell>{setting?.valor?.toString()}</Table.Cell>
                <Table.Cell placeItems="end">
                  <Flex gap="4">
                    <IconButton
                      onClick={() => navigate(`/setting/${setting._id}`)}
                      colorPalette="cyan"
                      size="xs"
                    >
                      <FilePenLine />
                    </IconButton>
                    {user.tipo !== "padrao" && (
                      <IconButton
                        onClick={() =>
                          navigate(`/setting/${setting._id}/clone`)
                        }
                        colorPalette="green"
                        size="xs"
                      >
                        <CopyPlus />
                      </IconButton>
                    )}
                    {user.tipo !== "padrao" && (
                      <IconButton
                        onClick={() => {
                          onDelete(setting._id);
                        }}
                        colorPalette="red"
                        size="xs"
                      >
                        <Trash2 />
                      </IconButton>
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            )
        )}
      </Table.Body>
    </Table.Root>
  );
}
