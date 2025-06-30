import { Table, Popover, Portal } from "@chakra-ui/react";
import { memo } from "react";
import { flexRender } from "@tanstack/react-table";
import { DetailsCard } from "./card";

export const TableBody = memo(({ rows }) => {
  return (
    <Table.Body>
      {rows.map((row) => (
        <Popover.Root
          lazyMount
          key={row.id}
          positioning={{ placement: "right-end" }}
        >
          <Table.Row>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell
                fontSize="md"
                w={`calc(var(--col-${cell.column.id}-size) * 1px)`}
                key={cell.id}
              >
                <Popover.Trigger w="full" h="full">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Popover.Trigger>
              </Table.Cell>
            ))}
          </Table.Row>
          <Portal>
            <Popover.Positioner>
              <Popover.Content width="auto">
                <Popover.Arrow />
                <Popover.Body
                  maxW="1440px"
                  overflow="auto"
                  className="custom-scrollbar"
                >
                  <DetailsCard data={row.original} />
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      ))}
    </Table.Body>
  );
});
