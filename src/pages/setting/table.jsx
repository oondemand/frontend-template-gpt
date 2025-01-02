import { Flex, Table, IconButton, Text, Input } from "@chakra-ui/react";
import { FilePenLine, Trash2, CopyPlus, Search } from "lucide-react";
import { useState } from "react";
import { DebouncedInput } from "../../components/ui/debounced-input";
import { InputGroup } from "../../components/ui/input-group";

export function SettingsTable({ data }) {
  const [settings, setSettings] = useState(data);

  console.log(settings);

  const handleSearch = (value) => {
    console.log(value);

    const results = data.filter((e) => {
      return e.baseOmie.nome.toLowerCase().includes(value.toLowerCase());
    });

    setSettings(results);
  };

  return (
    <Table.Root variant="line" striped>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>
            <Flex alignItems="center" gap="4">
              <Text>Base omie </Text>
              <InputGroup startElement={<Search size={16} />}>
                <DebouncedInput
                  placeholder="Procurar..."
                  value=""
                  w="48"
                  h="6"
                  size="xs"
                  onChange={handleSearch}
                  debounce={700}
                />
              </InputGroup>
            </Flex>
          </Table.ColumnHeader>
          <Table.ColumnHeader>Nome</Table.ColumnHeader>
          <Table.ColumnHeader>Codigo</Table.ColumnHeader>
          <Table.ColumnHeader>Valor</Table.ColumnHeader>
          <Table.ColumnHeader />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {settings.map((setting) => (
          <Table.Row key={setting._id}>
            <Table.Cell>{setting.baseOmie.nome}</Table.Cell>
            <Table.Cell>{setting.nome}</Table.Cell>
            <Table.Cell>{setting.codigo}</Table.Cell>
            <Table.Cell>{setting?.valor?.intervaloSincronizacao}</Table.Cell>
            <Table.Cell placeItems="end">
              <Flex gap="4">
                <IconButton
                  onClick={() => navigate(`/setting/${setting._id}`)}
                  colorPalette="cyan"
                  size="xs"
                >
                  <FilePenLine />
                </IconButton>
                <IconButton
                  onClick={() => navigate(`/setting/${setting._id}/clone`)}
                  colorPalette="green"
                  size="xs"
                >
                  <CopyPlus />
                </IconButton>
                <IconButton
                  onClick={() => {
                    onDelete(setting._id);
                  }}
                  colorPalette="red"
                  size="xs"
                >
                  <Trash2 />
                </IconButton>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
